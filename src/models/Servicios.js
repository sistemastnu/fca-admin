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
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  relativePath: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contentPage: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  imagePage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Servicios;
