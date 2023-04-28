export async function onRequest(context) {
  const ps = context.env.TEST_DB.prepare('SELECT * from vip');
  const data = await ps.first();

  return Response.json(data);
}