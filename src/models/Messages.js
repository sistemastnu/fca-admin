import sequelize from "@/lib/sequelize";
import { DataTypes } from "sequelize";

const Messages = sequelize.define("Messages", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sender: {
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
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  label: {
    type: DataTypes.STRING,
    defaultValue: "inbox",
    allowNull: false,
  },
});

export default Messages;
