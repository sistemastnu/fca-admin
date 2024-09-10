import sequelize from "@/lib/sequelize";
import User from "@/models/User";

export default async function handler(req, res) {
  await sequelize.sync();

  if (req.method === "GET") {
    try {
      const users = await User.findAll();
      res.status(201).json(users);
    } catch (error) {
      res.status(500).json({ error: "Error al consultar los usuarios" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Método ${req.method} no permitido`);
  }

  if (req.method === "POST") {
    const { username, email, password, rol } = req.body;
    try {
      const user = await User.create({ username, email, password, rol });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Error al consultar los usuarios" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
