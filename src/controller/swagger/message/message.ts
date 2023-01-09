import { endpointMessage } from "@controller/routes";
import {
    readAllMessageSwager,
    createMessageSwagger,
    updateMessageSwagger,
    deleteMessageSwagger
} from './crud'
const messageCrudSwagger = {
    [`/${endpointMessage}`]: {
        get: { ...readAllMessageSwager },
        post: { ...createMessageSwagger }
    },
    [`/${endpointMessage}/{id}`]: {
        put: { ...updateMessageSwagger },
        delete: { ...deleteMessageSwagger }
    }

}
export { messageCrudSwagger }