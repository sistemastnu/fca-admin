import { DataTypes } from "sequelize";

const Privacity = sequelize.define("Privacity", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Privacity;
