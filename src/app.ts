import "@data/sequelizeModel/relation";

import {
  AddUserRequest,
  CreateConversationRequest,
  CreateMessageRequest,
  GetById,
  LoginSchemaBody,
  RegisterSchemaBody,
  UpdateConversationRequest,
  UpdateMessageRequest
} from "@controller/schema";
import {
  ConversationModel, MessageModel, UserHasConverstionModel, UserModel
} from "@data/sequelizeModel";
import * as bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import Express, { Request, Response, response } from "express";
import * as swaggerUI from "swagger-ui-express";

import { CreateRoute, swaggerConfig } from "./controller";
import { ConversationRoute, MessageRoute, UserRoute } from "./controller/routes";
import { ConversationService, MessageService, UserService } from "./controller/services";
import {
  CommonValidator, ConversationValidator, MessageValidator, UserValidator
} from "./controller/validator";
import { ConversationData, MessageData, UserData } from "./data/services";
import { MessageDomain, UserDomain } from "./domain/services";
import { ConversationDomain } from "./domain/services/conversation";

const app = Express();
app.use(cors());
app.use(bodyParser.json());
let path = ".env";
if (process.env.APP_ENV) path = `${path}.${process.env.APP_ENV}`;

config({ path: path });
const PORT = process.env.PORT ?? 3000;

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerConfig));
const createRoute = new CreateRoute({ app, res: response });

app.get("/health", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send();
});

/// //////////////////////////////MODEL////////////////////////////////////////////

/// /////////////////////////////VALIDATOR/////////////////////////////////////////

const userValidator = new UserValidator({
  registerSchemaBody: RegisterSchemaBody, loginSchemaBody: LoginSchemaBody
});
const messageValidator = new MessageValidator({
  createMessageRequest: CreateMessageRequest, updateMessageRequest: UpdateMessageRequest
});
const conversationValidator = new ConversationValidator({
  createConversationRequest: CreateConversationRequest,
  updateConversationRequest: UpdateConversationRequest,
  addUserRequest: AddUserRequest
});
const commonValidator = new CommonValidator({ getById: GetById });
/// /////////////////////////////DATA///////////////////////////////////////////////
const userProvider = new UserData({ userModel: UserModel });
const messageProvider = new MessageData({ messageModel: MessageModel });
const conversationProvider = new ConversationData({
  conversationModel: ConversationModel, userHasConverstionModel: UserHasConverstionModel
});

/// /////////////////////////////DOMAIN/////////////////////////////////////////////
const userDomain = new UserDomain({ userProvider });
const messageDomain = new MessageDomain({ messageProvider, conversationProvider });
const conversationDomain = new ConversationDomain({ conversationProvider, userProvider });

/// /////////////////////////////CONTROLLER/////////////////////////////////////////

const userService = new UserService({ userDomain, userValidator, commonValidator });
const messageService = new MessageService({
  messageDomain, userDomain, messageValidator, commonValidator
});
const conversationService = new ConversationService({
  conversationDomain, conversationValidator, commonValidator
});

const userRoute = new UserRoute({ createRoute, userService });
const messageRoute = new MessageRoute({ createRoute, messageService });
const conversationRoute = new ConversationRoute({ createRoute, conversationService });
userRoute.init();
messageRoute.init();
conversationRoute.init();
app.all("*", async function NotFound(req: Request, res: Response) {
  res.status(404).send({
    message: "route not found"
  });
});
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`listen on port ${3000}`); // eslint-disable-line no-console
  });
}

export { app };
