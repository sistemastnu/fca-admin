import sequelize from "@/lib/sequelize";
import { DataTypes } from "sequelize";

const Servicios = sequelize.define("Servicios", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Servicios;
