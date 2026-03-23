import { db } from "../db";
import { golejadors } from "../db/schema";
import { eq, and } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': 'http://localhost:9000',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization',
  })

  if (event.method === 'OPTIONS') {
    event.node.res.statusCode = 204
    event.node.res.end()
    return
  }

  try {
    const { user } = await requireUserSession(event);
    const userId = Number(user.id);
    const method = event.method;

    if (method === 'GET') {
      return await db.select()
        .from(golejadors)
        .where(eq(golejadors.userId, userId));
    }

    if (method === 'POST') {
      const body = await readBody(event);
      return await db.insert(golejadors).values({
        name: body.name,
        team: body.team,
        goals: Number(body.goals),
        userId: userId,
      }).returning();
    }

    if (method === 'PUT') {
      const idToUpdate = Number(event.context.params?.id || getQuery(event).id);
      const body = await readBody(event);
      await db.update(golejadors)
        .set({ name: body.name, team: body.team, goals: Number(body.goals) })
        .where(and(eq(golejadors.id, idToUpdate), eq(golejadors.userId, userId)));
      return { message: "Modificat" };
    }

    if (method === 'DELETE') {
      const idToDelete = Number(getQuery(event).id);

      if (!idToDelete) {
        throw createError({ statusCode: 400, message: "Falta el ID" });
      }

      await db.delete(golejadors)
        .where(and(
          eq(golejadors.id, idToDelete),
          eq(golejadors.userId, userId)
        ));

      return { message: "Eliminat" };
    }
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: "Sessió no vàlida o error de servidor"
    });
  }
});