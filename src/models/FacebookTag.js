import { DataTypes } from "sequelize";

const { default: sequelize } = require("@/lib/sequelize");

const FacebookTag = sequelize.define("FacebookTag", {
  htmlVerification: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  pixel: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  siteTitle: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  siteUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  metakeywords: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: true,
  },
});

export default FacebookTag;
