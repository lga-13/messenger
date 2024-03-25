import Block from '../../components/base/block.ts';
import greetings from './chats_list-template.ts';
import ChatMiniature from './chat_miniature/chat_miniature.ts';
import {getChatsList, IDialogue, readMessageChain} from '../../pages/chat-page/chat-page.ts';
import TimeConverter from '../../modules/time_prepare/converter.ts';
import RandomAvatar from '../../modules/random_avatar_generator/default_avatar_pool.ts';

export interface ChatListBlockType
    {
        showMessageChain: (user_id: number) => void
    }

export default class ChatList extends Block {
  userId?: number;

  constructor(props: ChatListBlockType) {
    // Созадние чат листа

    // Создаём враппер DOM-элемент button
    super('div', props);
  }

  buildChatList(activeChat = null) {
    const chatList: ChatMiniature[] = [];
    Object.values(getChatsList()).forEach((chat: IDialogue) => {
      let counter = 0;
      Object.values(chat.message_chain).forEach((message) => {
        if (!message.read && !message.me) {
          counter += 1;
        }
      });

      let formattedText = chat.message_chain[chat.message_chain.length - 1].text;
      if (formattedText.length > 25) {
        formattedText = `${formattedText.substring(0, 25)} ...`;
      }

      const currentChatMiniature = new ChatMiniature({
        active: activeChat && activeChat === chat.index,
        srcName: RandomAvatar.get(chat.index),
        index: chat.index,
        sender: chat.sender,
        your: chat.message_chain[chat.message_chain.length - 1].me,
        content: formattedText,
        time: new TimeConverter(
          chat.message_chain[chat.message_chain.length - 1].time,
        ).toChatList(),
        count: counter,
        events: {
          click: () => {
            readMessageChain(chat.index);
            this.props.showMessageChain(chat.index);
            this.update(chat.index);
          },
        },
      });
      chatList.push(currentChatMiniature);
    });
    this.children.chatList = chatList;
  }

  update(userId: number) {
    this.userId = userId;
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  render() {
    if (!this.children.chatList) {
      this.buildChatList();
    } else {
      this.buildChatList(this.userId);
    }
    return this.compile(greetings, this.props);
  }
}
