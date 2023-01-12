import { endpointConversation } from "@controller/routes";
import {
    readAllConversationSwagger,
    createConversationSwagger,
    updateConversationSwagger,
    deleteConversationSwagger,
    readConversationWithUser
} from './crud'
import { addUserConversationSwagger } from './addConversation'
import { removeUserConversationSwagger } from './removeConversation'
const conversationSwagger = {
    [`/${endpointConversation}`]: {
        get: { ...readAllConversationSwagger },
        post: { ...createConversationSwagger }
    },
    [`/${endpointConversation}/{id}`]: {
        get: { ...readConversationWithUser },
        put: { ...updateConversationSwagger },
        delete: { ...deleteConversationSwagger }
    },
    [`/${endpointConversation}/addUser`]: {
        post: addUserConversationSwagger
    },
    [`/${endpointConversation}/removeUser`]: {
        post: removeUserConversationSwagger
    }

}
export { conversationSwagger }