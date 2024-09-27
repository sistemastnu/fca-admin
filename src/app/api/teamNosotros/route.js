export async function POST(request) {
  try {
    await sequelize.sync();
    const formData = await request.formData();
    console.log(formData);
  } catch (error) {}
}
