export async function onRequest(context) {

  const ps = context.env.TEST_DB.prepare('SELECT * from vip');
  // const data = await ps.first();
  console.log("context.env.TEST_DB:", context.env.TEST_DB)
  const data = await ps.all();

  return Response.json(data.results);
}