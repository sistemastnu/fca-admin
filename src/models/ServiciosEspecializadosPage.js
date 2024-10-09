import sequelize from "@/lib/sequelize";
import { DataTypes } from "sequelize";

const ServiciosEspePage = sequelize.define("ServiciosEspePage", {
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
      model: "OtherServices",
      key: "id",
    },
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});
export default ServiciosEspePage;
