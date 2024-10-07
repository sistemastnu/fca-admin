import sequelize from "@/lib/sequelize";
import { DataTypes } from "sequelize";

const FirstPageContent = sequelize.define("FirstPageContent", {
  firstTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstSubtitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  secondTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  secondSubtitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
export default FirstPageContent;
