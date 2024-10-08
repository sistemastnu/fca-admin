import sequelize from "@/lib/sequelize";
import { DataTypes } from "sequelize";

const TeamNosotros = sequelize.define("TeamNosotros", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descriptions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  photoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  relativePath: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default TeamNosotros;
