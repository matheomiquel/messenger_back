import { ConversationModel } from "./conversation";
import { MessageModel } from "./message";
import { UserModel } from "./user";
import { UserHasConverstionModel } from "./user_has_conversation";
(async () => {
  await UserModel.sync();
  await ConversationModel.sync();
  await MessageModel.sync();
  await UserHasConverstionModel.sync();
})();
