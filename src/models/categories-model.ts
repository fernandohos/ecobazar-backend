import { db } from "../database";

async function getCategories() {
  const client = await db.connect();
  try {
    const query = `
    SELECT
      c.id as id,
      c.name as name,
      c.icon_url as icon_url,
      COUNT(p.id) as product_count
    FROM
      categories c
    LEFT JOIN
      products p ON LOWER(c.name) = LOWER(p.category)
    GROUP BY
      c.id, c.name, c.icon_url
    ORDER BY
      c.name;
    `;

    const result = await client.query(query);

    return result.rows;
  } catch (error) {
    console.error("Error creating user: ", error);
  } finally {
    client.release();
  }
}

export default { getCategories };
