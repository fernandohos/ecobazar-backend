import { db } from "../database";

type User = {
  name: string;
  email: string;
  password: string;
};

async function createUser(user: User) {
  const client = await db.connect();
  try {
    const query =
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)";
    const values = Object.values(user);
    await client.query(query, values);
  } catch (error) {
    console.error("Error creating user: ", error);
  } finally {
    client.release();
  }
}

async function getUserByEmail(
  email: string
): Promise<(User & { id: string }) | undefined> {
  const client = await db.connect();
  try {
    const query = "SELECT * FROM users WHERE users.email = $1";
    const { rows } = await client.query<any>(query, [email]);

    return rows[0];
  } catch (error) {
    console.error("Error getting user: ", error);
  } finally {
    client.release();
  }
}

export default { createUser, getUserByEmail };
