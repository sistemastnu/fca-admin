import sequelize from "@/lib/sequelize";
import { DataTypes } from "sequelize";

const Servicios = sequelize.define("Servicios", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  hoverColor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Servicios;
