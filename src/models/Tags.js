import sequelize from "@/lib/sequelize";
import { DataTypes } from "sequelize";

const Tags = sequelize.define("Tags", {
  tag: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idPost: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Tags;
