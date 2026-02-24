import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {

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

  await setUserSession(event, {
    user: userWithOutPassword
  })

  return userWithOutPassword

});
