import sequelize from "@/lib/sequelize";
import { DataTypes } from "sequelize";

const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profilePhoto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  occupation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
