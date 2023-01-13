import { endpointConversation } from "@controller/routes";

import { addUserConversationSwagger } from "./addConversation";
import {
  createConversationSwagger,
  deleteConversationSwagger,
  readAllConversationSwagger,
  readConversationWithMessagesSwagger,
  readConversationWithUser,
  updateConversationSwagger
} from "./crud";
import { removeUserConversationSwagger } from "./removeConversation";
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
  [`/${endpointConversation}/user/{id}`]: {
    get: { ...readConversationWithUser }
  },
  [`/${endpointConversation}/message/{id}`]: {
    get: { ...readConversationWithMessagesSwagger }
  },
  [`/${endpointConversation}/addUser`]: {
    post: addUserConversationSwagger
  },
  [`/${endpointConversation}/removeUser`]: {
    post: removeUserConversationSwagger
  }

};
export { conversationSwagger };
