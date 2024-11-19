import { DataTypes } from "sequelize";

const { default: sequelize } = require("@/lib/sequelize");

const FacebookTag = sequelize.define("FacebookTag", {
  htmlVerification: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  pixelHead: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  pixelBody: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  siteTitle: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  siteUrl: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  metakeywords: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default FacebookTag;
