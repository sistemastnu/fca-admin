import sequelize from "@/lib/sequelize";
import { DataTypes } from "sequelize";

const Sponsors = sequelize.define("sponsors", {
  sponsorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photoSponsor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Sponsors;
