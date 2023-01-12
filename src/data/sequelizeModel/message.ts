import { DataTypes, ModelDefined } from "sequelize";

import { MessageDB } from "../model";
import { sequelize } from "./config";
import { MESSAGE } from "./tableName";
const table = MESSAGE;

const MessageModel: ModelDefined<MessageDB, undefined> = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        key: "id",
        model: {
          tableName: "user"
        }

      }
    },
    conversation_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        key: "id",
        model: {
          tableName: "conversation"
        }

      }
    },
    content: {
      type: new DataTypes.STRING(1000),
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

export { MessageModel };
