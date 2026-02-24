export async function addGolejador(name: string, team: string, goals: number, userId: number) {

    const res = await useDb().insert(schema.golejadors).values({
        name,
        team,
        goals,
        userId 
    }).returning()

    const newGolejador = res.at(0);

    if (!newGolejador) {
        throw createError({
            statusCode: 500, statusMessage: "Error al afegir un nou golejador"
        })
    }

    return newGolejador
}