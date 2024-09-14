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
  author_id: {
    type: DataTypes.INT,
    allowNull: false,
  },
  publish_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM,
    allowNull: false,
  },
  slug: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Posts;
