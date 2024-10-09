import sequelize from "@/lib/sequelize";
import { DataTypes } from "sequelize";

const ServiciosPage = sequelize.define("ServiciosPage", {
  tittle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  mediaContent: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  idService: {
    type: DataTypes.INTEGER,
    references: {
      model: "Servicios",
      key: "id",
    },
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

export default ServiciosPage;
