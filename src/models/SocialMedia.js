import sequelize from "@/lib/sequelize";
import { DataTypes } from "sequelize";

const SocialMedia = sequelize.define("SocialMedia", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default SocialMedia;
