import { ConversationDB } from "@data/model";
import { DataTypes, ModelDefined } from "sequelize";

import { sequelize } from "./config";
import { CONVERSATION, USER } from "./tableName";
const table = CONVERSATION;

const ConversationModel: ModelDefined<ConversationDB, undefined> = sequelize.define(
  "Conversation",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    admin: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        key: "id",
        model: {
          tableName: USER
        }

      }
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

export { ConversationModel };
