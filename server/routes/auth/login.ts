import jwt from 'jsonwebtoken';
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  if (event.method === 'OPTIONS') {
    event.node.res.statusCode = 204
    event.node.res.statusMessage = 'No Content'
    return 'OK'
  }

  const { email, password } = await readBody(event)

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: "Faltan camps per introduir" })
  }

  const existingUser = await useDb().query.users.findFirst({
    where: eq(schema.users.email, email)
  })

  if (!existingUser) {
    throw createError({ statusCode: 400, statusMessage: "El mail o el password són incorrectes" })
  }

  if (!existingUser.password) {
    throw createError({ statusCode: 400, statusMessage: "Invalid password GitHub" })
  }

  const isValid = await verifyPassword(existingUser.password, password)

  if (!isValid) {
    throw createError({ statusCode: 400, statusMessage: "Password incorrecte" })
  }

  const { password: repassword, ...userWithOutPassword } = existingUser

  const token = jwt.sign(
    { id: existingUser.id, email: existingUser.email },
    'MI_CLAVE_SECRETA_SUPER_SEGURA',
    { expiresIn: '7d' }
  );

  return {
    token: token,
    user: userWithOutPassword
  };
});