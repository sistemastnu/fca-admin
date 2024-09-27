import sequelize from "@/lib/sequelize";
import { DataTypes } from "sequelize";

const Contactanos = sequelize.define("Contactanos", {
  informacionEmp: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Firma de Contabilidad Auditoría y Gestión Estratégica",
  },
  ubicacion: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:
      "Av. Plutarco Elías Calles 112 83000 Hermosillo, Sonora, México",
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "+52 (662) 437 5964",
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "servicios@fca.mx",
  },
});

export default Contactanos;
