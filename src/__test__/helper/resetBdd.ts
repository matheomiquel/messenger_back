import {
  ConversationModel,
  MessageModel,
  UserHasConverstionModel,
  UserModel
} from "@src/data/sequelizeModel";

export async function reset() {
  await UserHasConverstionModel.destroy({
    where: {}
  });
  await MessageModel.destroy({
    where: {}
  });
  await ConversationModel.destroy({
    where: {}
  });
  await UserModel.destroy({
    where: {}
  });
}
