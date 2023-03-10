import { DataTypes, ModelDefined } from "sequelize";

import { UserDB } from "../model";
import { sequelize } from "./config";
import { USER } from "./tableName";
const table = USER;

const UserModel: ModelDefined<UserDB, undefined> = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    tableName: table,
    underscored: true,
    freezeTableName: true
  }
);

export { UserModel };
