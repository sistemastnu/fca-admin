import sequelize from "@/lib/sequelize";
import { DataTypes } from "sequelize";

const Nosotros = sequelize.define("nosotros", {
  tittle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  photoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Nosotros;
