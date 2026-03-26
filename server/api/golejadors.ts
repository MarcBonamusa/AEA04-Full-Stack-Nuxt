import jwt from 'jsonwebtoken';
import { db } from "../db";
import { golejadors } from "../db/schema";
import { eq, and } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  if (event.method === 'OPTIONS') {
    event.node.res.statusCode = 204;
    event.node.res.end();
    return;
  }

  try {
    const authHeader = getRequestHeader(event, 'authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError({ statusCode: 401, message: "Falta el token JWT o el format és incorrecte" });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, 'MI_CLAVE_SECRETA_SUPER_SEGURA') as { id: number, email: string };
    
    const userId = Number(decoded.id);
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
      statusMessage: "Sessió no vàlida, token caducat o error de servidor"
    });
  }
});