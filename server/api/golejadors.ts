import { db } from "../db";
import { golejadors } from "../db/schema";
import { eq, and } from "drizzle-orm";

export default defineEventHandler(async (event) => {
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
    const query = getQuery(event);
    const idToUpdate = Number(query.id);
    const body = await readBody(event);

    await db.update(golejadors)
      .set({
        name: body.name,
        team: body.team,
        goals: Number(body.goals)
      })
      .where(and(
        eq(golejadors.id, idToUpdate),
        eq(golejadors.userId, userId)
      ));

    return { message: "Modificat correctament" };
  }

  if (method === 'DELETE') {
    const query = getQuery(event);
    const idToDelete = Number(query.id);

    await db.delete(golejadors)
      .where(and(
        eq(golejadors.id, idToDelete),
        eq(golejadors.userId, userId)
      ));

    return { message: "Eliminat" };
  }
});