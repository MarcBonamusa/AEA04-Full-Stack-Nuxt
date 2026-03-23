export default defineEventHandler(async (event) => {
  if (event.method === 'OPTIONS') {
    event.node.res.statusCode = 204
    return 'OK'
  }

  await clearUserSession(event)
  
  return { message: 'Sessió tancada' }
})