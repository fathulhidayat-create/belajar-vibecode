import { Elysia } from "elysia";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const userRoutes = new Elysia({ prefix: "/users" })
  // GET /users - Ambil semua users
  .get("/", async () => {
    const allUsers = await db.select().from(users);
    return allUsers;
  })

  // GET /users/:id - Ambil user berdasarkan ID
  .get("/:id", async ({ params, set }) => {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, Number(params.id)));

    if (user.length === 0) {
      set.status = 404;
      return { message: "User not found" };
    }

    return user[0];
  })

  // POST /users - Buat user baru
  .post("/", async ({ body, set }) => {
    const { name, email } = body as { name: string; email: string };

    const result = await db.insert(users).values({ name, email });

    set.status = 201;
    return { message: "User created", id: result[0].insertId };
  })

  // DELETE /users/:id - Hapus user berdasarkan ID
  .delete("/:id", async ({ params, set }) => {
    await db.delete(users).where(eq(users.id, Number(params.id)));

    return { message: "User deleted" };
  });
