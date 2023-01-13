import { ConversationModel } from "./conversation";
import { MessageModel } from "./message";
import { USER_HAS_CONVERSATION } from "./tableName";
import { UserModel } from "./user";

ConversationModel.belongsTo(
  UserModel,
  {
    targetKey: "id",
    as: "conversation_user",
    foreignKey: "admin",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  }
);

ConversationModel.belongsToMany(
  UserModel,
  {
    through: USER_HAS_CONVERSATION,
    as: "conversation_has_user",
    sourceKey: "id",
    targetKey: "id",
    otherKey: "user_id"
  }
);

ConversationModel.hasMany(MessageModel, {
  foreignKey: "conversation_id",
  sourceKey: "id",
  as: "conversation_messages"
});

UserModel.belongsToMany(
  ConversationModel,
  {
    through: USER_HAS_CONVERSATION,
    as: "user_conversation",
    sourceKey: "id",
    targetKey: "id",
    otherKey: "conversation_id"
  }
);

UserModel.hasMany(MessageModel, {
  foreignKey: "user_id",
  sourceKey: "id",
  as: "user_messages"
});

MessageModel.belongsTo(
  UserModel,
  {
    targetKey: "id",
    as: "message_user",
    foreignKey: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  }
);
MessageModel.belongsTo(
  ConversationModel,
  {
    targetKey: "id",
    as: "message_conversation",
    foreignKey: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  }
);
