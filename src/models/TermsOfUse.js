import { DataTypes } from "sequelize";

const { default: sequelize } = require("@/lib/sequelize");

const TermOfUSe = sequelize.define("TermsOfUse", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

export default TermOfUSe;
