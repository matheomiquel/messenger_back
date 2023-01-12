import {
    UserModel,
    MessageModel,
    ConversationModel,
    UserHasConverstionModel
} from '@src/data/sequelizeModel';

export async function reset() {
    try {
        await UserHasConverstionModel.destroy({
            where: {}
        })
        await MessageModel.destroy({
            where: {}
        });
        await ConversationModel.destroy({
            where: {}
        });
        await UserModel.destroy({
            where: {}
        });

    } catch (e) {
        console.log({ error: e })
    }
}