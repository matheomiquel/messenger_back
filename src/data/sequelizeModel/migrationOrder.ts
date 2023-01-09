import { UserModel } from './user'
import { MessageModel } from './message'
(async () => {
    try {
        await UserModel.sync()
        await MessageModel.sync();
    } catch (e) {
        console.log(e)
    }
})()

