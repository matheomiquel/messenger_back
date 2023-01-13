import { CreateConversationHelper, MessageHelper } from "@test/helper";
export class MessageStory {
  private readonly createConversationHelper: InstanceType<typeof CreateConversationHelper>;

  private readonly messageHelper: InstanceType<typeof MessageHelper>;

  constructor({
    createConversationHelper,
    messageHelper
  }:
        {
            createConversationHelper: InstanceType<typeof CreateConversationHelper>,
            messageHelper: InstanceType<typeof MessageHelper>,
        }) {
    this.createConversationHelper = createConversationHelper;
    this.messageHelper = messageHelper;
  }

  async create(
    {
      userName,
      email,
      password,
      conversationName,
      messageContent
    }: {
            userName: string,
            email: string,
            password: string,
            conversationName: string,
            messageContent: string
        }
  ) {
    const { creator, conversation } = await this.createConversationHelper.create({
      userName,
      email,
      password,
      conversationName
    });
    const message = await this.messageHelper.create({
      token: creator.body.token,
      conversationId: conversation.body.id,
      content: messageContent
    });
    return { creator, conversation, message };
  }
}
