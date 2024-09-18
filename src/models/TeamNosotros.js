import sequelize from "@/lib/sequelize";
import { DataTypes } from "sequelize";

const TeamNosotros = sequelize.define("teamNosotros", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descriptions: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photoUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default TeamNosotros;
