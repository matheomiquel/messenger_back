import { UserModel } from './user'
import { MessageModel } from './message'
import { ConversationModel } from './conversation'
import { UserHasConverstionModel } from './user_has_conversation'
(async () => {
    try {
        await UserModel.sync()
        await ConversationModel.sync();
        await MessageModel.sync();
        await UserHasConverstionModel.sync();
    } catch (e) {
        console.log(e)
    }
})()

