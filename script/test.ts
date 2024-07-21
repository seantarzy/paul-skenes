import { sql } from "@vercel/postgres";

export async function testScript() {
  console.log("testScript");
  const result = await sql`SELECT NOW()`;
  console.log("result: ", result);
}
