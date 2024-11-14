import { DataTypes } from "sequelize";

const { default: sequelize } = require("@/lib/sequelize");

const Seo = sequelize.define("Seo", {
  platform: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tagContent: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Seo;
