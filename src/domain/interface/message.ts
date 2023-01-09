import { Message } from "@domain/model";

export interface MessageInterface {
    read({ order, limit, offset }: { order: string, limit: number, offset: number }): Promise<Message[]>
    getById({ id }: { id: number }): Promise<Message>
    create({ user_id, content }: { user_id: number, content: string }): Promise<Message>
    update({ id, content }: { id: number,  content: string }): Promise<void>
    delete({ id }: { id: number }): Promise<void>
}