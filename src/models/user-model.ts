import { db } from "../database";
import type { User, UserRegister } from "../types/User";

async function createUser(user: UserRegister) {
  const client = await db.connect();
  try {
    const query =
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)";
    const values = Object.values(user);
    await client.query(query, values);
  } catch (error) {
    console.error("Error creating user: ", error);
  } finally {
    client.release();
  }
}

async function getUserByEmail(email: string): Promise<User | undefined> {
  const client = await db.connect();
  try {
    const query = "SELECT * FROM users WHERE users.email = $1";
    const { rows } = await client.query(query, [email]);

    return rows[0];
  } catch (error) {
    console.error("Error getting user: ", error);
  } finally {
    client.release();
  }
}

export default { createUser, getUserByEmail };
