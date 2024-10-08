import sequelize from "@/lib/sequelize";
import { DataTypes } from "sequelize";

const OtherServices = sequelize.define("OtherServices", {
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
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
export default OtherServices;
