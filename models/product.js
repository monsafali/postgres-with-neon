import { sql } from "../db/db.js";

export async function Proudct() {
  await sql`
        CREATE TABLE IF NOT EXISTS product (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
  console.log("Product tble created succesfuly");
}
