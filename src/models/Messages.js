import sequelize from "@/lib/sequelize";
import { DataTypes } from "sequelize";

const Messages = sequelize.define("Messages", {
  sender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receiver: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "unread",
    allowNull: false,
  },
  label: {
    type: DataTypes.STRING,
    defaultValue: "inbox",
    allowNull: false,
  },
});

export default Messages;
