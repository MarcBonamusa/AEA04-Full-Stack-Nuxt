import { eq } from "drizzle-orm"
import { registerUser, throwIfUserExist } from "~~/server/utils/registerUtils"

export default defineEventHandler(async (event) => {
    // 1. Accedir als camps del formulari
    const {name, email, password} = await readBody(event)
    
    if (!name || !email || !password) {
        throw createError({statusCode: 400, statusMessage: "Faltan camps per introduir"})
    }

    await throwIfUserExist(email)

    const newUser = await registerUser(name, email, password)

    const {password: repassword, ...userWithOutPassword} = newUser

    await setUserSession(event, {
        user: userWithOutPassword
    })

    return userWithOutPassword
})
