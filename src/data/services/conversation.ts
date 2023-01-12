import { ConversationInterface } from "@domain/interface";
import { Conversation, ConversationWithUsers } from "@src/domain/model";
import { ConversationDB, ConversationWithUsersDB } from "@data/model";
import { createError } from "@src/createError";
import { ConversationModel, UserModel, UserHasConverstionModel } from "@data/sequelizeModel";
export class ConversationData implements ConversationInterface {
    async read({ order, limit, offset }: { order: string, limit: number, offset: number }): Promise<Conversation[]> {
        const conversationDB = await ConversationModel.findAll({
            offset,
            limit,
            order: [['createdAt', order]],
        }) as unknown as Conversation[];
        return conversationDB.map((conversation =>
            new Conversation({ id: conversation.id, name: conversation.name, admin: conversation.admin })
        ))
    }

    async getById({ id }: { id: number }): Promise<Conversation> {
        const conversation = await ConversationModel.findByPk(id) as unknown as ConversationDB
        if (!conversation) {
            throw await createError({ message: ['Conversation not found'], status: 404 })
        }
        return new Conversation({ id: conversation.id, name: conversation.name, admin: conversation.admin })
    }

    async getConversationWithUser({ id }: { id: number }): Promise<ConversationWithUsers> {
        const conversationWithUserDB = await ConversationModel.findByPk(id, {
            include: [{
                as: 'conversation_has_user',
                model: UserModel
            }]
        }) as unknown as ConversationWithUsersDB
        if (!conversationWithUserDB)
            throw await createError({ message: ["conversation not found"], status: 404 })
        const conversation = new ConversationWithUsers({
            id: conversationWithUserDB.id,
            name: conversationWithUserDB.name,
            admin: conversationWithUserDB.admin,
            users: conversationWithUserDB.conversation_has_user
        })
        return conversation
    }

    async create({ userId, name }: { userId: number; name: string; }): Promise<Conversation> {
        const conversation = await ConversationModel.create({
            admin: userId,
            name
        }) as unknown as ConversationDB;
        await UserHasConverstionModel.create({
            user_id: userId,
            conversation_id: conversation.id
        })
        return new Conversation({ id: conversation.id, name: conversation.name, admin: conversation.admin })
    }

    async update({ id, name }: { id: number; name: string; }): Promise<void> {
        await ConversationModel.update({
            name: name
        },
            {
                where: {
                    id: id,
                }
            })
    }

    async delete({ id }: { id: number; }): Promise<void> {
        await UserHasConverstionModel.destroy({
            where: {
                conversation_id: id
            }
        })
        await ConversationModel.destroy(
            {
                where: {
                    id: id,
                }
            })
    }

    async addUser({ userId, conversationId }: { userId: number; conversationId: number; }): Promise<void> {
        await UserHasConverstionModel.create({
            user_id: userId,
            conversation_id: conversationId
        })
    }
    async removeUser({ userId, conversationId }: { userId: number; conversationId: number; }): Promise<void> {
        await UserHasConverstionModel.destroy({
            where: {
                user_id: userId,
                conversation_id: conversationId
            }
        })
    }
}