import { UserHasUserModel } from './user_has_user'
import { UserModel } from './user'

(async () => {
    try {
        await UserModel.sync()
        await UserHasUserModel.sync()
    } catch (e) {
        console.log(e)
    }
})()

