import sequelize from "@/lib/sequelize";
import { DataTypes } from "sequelize";

const Posts = sequelize.define("Posts", {
  tittle: {
    type: DataTypes.STRING,
    allowNul: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  publish_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  relativePath: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Posts;
