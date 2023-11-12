import { QueryResult } from "pg";
import { db } from "../database";
import { Product } from "../types/Product";

export type FiltersType = {
  category: string;
  min_price: number;
  max_price: number;
  tags: string[];
  page_size: number;
  page_offset: number;
};

async function getProducts(filters: FiltersType) {
  console.log("got filters", filters);
  const client = await db.connect();
  const { category, min_price, max_price, tags, page_size, page_offset } =
    filters;
  const values = [category, min_price, max_price, tags, page_size, page_offset];

  function QueryProducts(): Promise<QueryResult<Product>> {
    const productsQuery = `
    SELECT *
    FROM products
    WHERE
      (category = $1 OR $1 IS NULL)
      AND (price >= $2 OR $2 IS NULL)
      AND (price <= $3 OR $3 IS NULL)
      AND (tags @> ARRAY[$4]::text[] OR $4 IS NULL)
      LIMIT $5
      OFFSET $6
  `;
    return new Promise((resolve) => {
      resolve(client.query(productsQuery, values));
    });
  }

  function QueryCount(): Promise<QueryResult<{ count: number }>> {
    const countQuery = `
      SELECT COUNT(*)
      FROM products
      WHERE
        (category = $1 OR $1 IS NULL)
        AND (price >= $2 OR $2 IS NULL)
        AND (price <= $3 OR $3 IS NULL)
        AND (tags @> ARRAY[$4]::text[] OR $4 IS NULL)
  `;
    return new Promise((resolve) => {
      resolve(client.query(countQuery, values.slice(0, -2)));
    });
  }

  try {
    return await Promise.all([QueryProducts(), QueryCount()])
      .then((r) => {
        console.log("DATABASE RESPONSE", r);
        return r;
      })
      .then((res) => ({
        products: res[0].rows,
        ...res[1].rows[0],
      }));
  } catch (error) {
    console.error("Error querying products: ", error);
  } finally {
    client.release();
  }
}

async function searchProducts(name: string) {
  const client = await db.connect();

  try {
    const query = `SELECT * FROM products WHERE name ILIKE $1`;
    const value = [`%${name}%`];

    const result = await client.query(query, value);

    return result.rows;
  } catch (error) {
    console.error("Error while searching products: ", error);
    throw error;
  }
}

export default { getProducts, searchProducts };
