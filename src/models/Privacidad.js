import sequelize from "@/lib/sequelize";
import { DataTypes } from "sequelize";

const Privacity = sequelize.define("Privacity", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Privacity;
