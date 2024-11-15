import { DataTypes } from "sequelize";
const { default: sequelize } = require("@/lib/sequelize");

const GoogleTag = sequelize.define("GoogleTag", {
  htmlSiteVerification: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tagHead: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tagBody: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  googleAnalytics: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

export default GoogleTag;
