import sequelize from "@/lib/sequelize";
import { DataTypes } from "sequelize";

const MessageLabel = sequelize.define("MessageLabel", {
  idMessage: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  label: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default MessageLabel;
