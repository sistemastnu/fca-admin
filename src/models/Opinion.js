import sequelize from "@/lib/sequelize";
import { DataTypes } from "sequelize";

const Opinions = sequelize.define("opinions", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descriptions: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stars: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
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
});

export default Opinions;
