/* eslint-disable no-console */
import Block from '../../components/base/block.ts';
import greetings from './chat-page-template.ts';
import Link from '../../components/link/link.ts';
import Plug from '../../components/plug/plug.ts';
import MessageChain from '../../blocks/message_chain/message_chain.ts';
import chat2 from '../../public/static/img/chat2.svg';
import ChatList from '../../blocks/chats_list/chats_list.ts';
import { Validator } from '../../validators/field_validator.ts';
import Form from '../../blocks/form/form.ts';
import './chat-page.css';
import render from '../../utils/render.ts';

export const MOCK_MESSAGE_DATA = [
  {
    srcName: chat2,
    index: 14658764747,
    sender: 'Мама',
    message_chain: [
      {
        me: true,
        text: 'В лесу растут шишки!',
        time: new Date('2024-03-23T10:30:34'),
        read: true,
      },
      {
        me: true,
        text: 'Крупные?',
        time: new Date('2024-03-23T10:30:36'),
        read: true,
      },
      {
        me: false,
        text: 'Крупные',
        time: new Date('2024-03-24T10:31:38'),
        read: false,
      }],
  },
  {
    srcName: chat2,
    index: 2343265678,
    sender: 'Папа',
    message_chain: [
      {
        me: false,
        text: 'Привет!',
        time: new Date('2024-03-23T09:54:12'),
        read: true,
      },
      {
        me: true,
        text: 'Привет! Как ты',
        time: new Date('2024-03-23T09:55:12'),
        read: true,
      },
      {
        me: false,
        text: 'Пойдет! А ты?',
        time: new Date('2024-03-23T09:58:12'),
        read: false,
      },
      {
        me: false,
        text: 'Ау',
        time: new Date('2024-03-23T09:59:12'),
        read: false,
      },
      {
        me: false,
        text: 'Ты тут?',
        time: new Date('2024-03-24T10:00:12'),
        read: false,
      }],
  },
  {
    srcName: chat2,
    index: 16565464623,
    sender: 'Мама',
    message_chain: [
      {
        me: true,
        text: 'Привет',
        time: new Date('2022-01-02T10:30:34'),
        read: true,
      },
    ],
  },
  {
    srcName: chat2,
    index: 15655,
    sender: 'Мама',
    message_chain: [
      {
        me: true,
        text: 'Привет',
        time: new Date('2022-01-02T10:30:34'),
        read: true,
      },
    ],
  },
  {
    srcName: chat2,
    index: 13,
    sender: 'Мама',
    message_chain: [
      {
        me: true,
        text: 'Привет',
        time: new Date('2022-01-02T10:30:34'),
        read: true,
      },
    ],
  },
  {
    srcName: chat2,
    index: 123,
    sender: 'Мама',
    message_chain: [
      {
        me: true,
        text: 'Привет',
        time: new Date('2022-01-02T10:30:34'),
        read: true,
      },
    ],
  },
  {
    srcName: chat2,
    index: 1233213123131,
    sender: 'Мама',
    message_chain: [
      {
        me: true,
        text: 'Привет',
        time: new Date('2022-01-02T10:30:34'),
        read: true,
      },
    ],
  },
  {
    srcName: chat2,
    index: 132323,
    sender: 'Мама',
    message_chain: [
      {
        me: true,
        text: 'Привет',
        time: new Date('2022-01-02T10:30:34'),
        read: true,
      },
    ],
  },
  {
    srcName: chat2,
    index: 1000,
    sender: 'Мама',
    message_chain: [
      {
        me: true,
        text: 'Привет',
        time: new Date('2022-01-02T10:30:34'),
        read: true,
      },
    ],
  },
  {
    srcName: chat2,
    index: 121211,
    sender: 'Мама',
    message_chain: [
      {
        me: true,
        text: 'Привет',
        time: new Date('2022-01-02T10:30:34'),
        read: true,
      },
    ],
  },
];

MOCK_MESSAGE_DATA.forEach((chat) => {
  chat.message_chain.sort((a, b) => new Date(a.time) - new Date(b.time));
});

export function getChatsList() {
  const sortChats = (chats) => chats.sort((a, b) => {
    const lastMessageTimeA = a.message_chain[a.message_chain.length - 1].time;
    const lastMessageTimeB = b.message_chain[b.message_chain.length - 1].time;
    return lastMessageTimeB - lastMessageTimeA;
  });

  return sortChats(MOCK_MESSAGE_DATA);
}

export function getMessageChain(index: number) {
  return MOCK_MESSAGE_DATA.find((item) => item.index === index)?.message_chain;
}

export function getSender(index: number) {
  return MOCK_MESSAGE_DATA.find((item) => item.index === index)?.sender;
}

export function addMessageChain(index, message, time) {
  const messageItem = MOCK_MESSAGE_DATA.find((item) => item.index === index);
  if (messageItem) {
    messageItem.message_chain.push({
      me: true,
      text: message,
      time,
      read: false,
    });
  } else {
    throw new Error(`Нет элемента с индексом ${index}`);
  }
  MOCK_MESSAGE_DATA.forEach((chat) => {
    chat.message_chain.sort((a, b) => new Date(a.time) - new Date(b.time));
  });
}

export function readMessageChain(index) {
  const messageItem = MOCK_MESSAGE_DATA.find((item) => item.index === index);
  if (messageItem) {
    Object.values(messageItem.message_chain).forEach((message) => {
      message.read = true;
    });
  } else {
    throw new Error(`Нет элемента с индексом ${index}`);
  }
}

export default class ChatPage extends Block {
  constructor(props: {
    searchForm?: Form,
    accountLink?: Link,
    chatPlug?: Plug,
    messageChain?: MessageChain,
    chatsList?: ChatList,
  }) {
    // Генерация списка чатов
    // Передаем функцию которая будет вызываться по клику миниатюры в чат листе для открытия чатов.
    // Передаем функцию которая будет прочитывать все чаты при клике на миниматюру.

    const chatList = new ChatList({
      showMessageChain: (userId: number) => { this.showMessageChain(userId); },
    });

    // Генерация месадж чейна и заглушки. По умолчанию скрыт месадж чейн.
    props.messageChain = new MessageChain({
      srcName: chat2,
      sender_name: {
        className: 'message-chain-header-title',
        text: '',
        tag: 'p',
      },
      messageForm: {
        className: 'message-chain-send-field',
        button: {
          className: 'message-chain-send-button',
          typeName: 'button',
          text: '',
          events: {
            click: () => {
              if (props.messageChain.children.messageChainForm.validate()) {
                const message = props.messageChain.children.messageChainForm.get_data();
                addMessageChain(props.messageChain.props.user_id, message.message, new Date());
                props.messageChain.setCurrentMessage(props.messageChain.props.user_id);
                props.messageChain.children.messageChainForm.clear();
              }
            },
            keydown: () => {},
          },
        },
        fields: [
          {
            input: {
              className: 'message-chain-message-input',
              name: 'message',
              placeholder: 'Cообщение',
              inputType: 'text',
            },
            validator: Validator.validateMessage,
          },
        ],
      },
      attachmentButton: {
        className: 'message-chain-attachment-button',
        typeName: 'button',
        text: '',
        settings: { withInternalID: true },
        events: { click: () => {} },
      },
      moreButton: {
        className: 'message-chain-more-button',
        typeName: 'button',
        text: '',
      },
      chatListHook: () => { chatList.update(props.messageChain.props.user_id); },
    });
    props.messageChain.hide();

    props.chatPlug = new Plug({
      className: 'chats-plug',
      plugLink: {
        className: 'chats-plug-message',
        href: '#',
        text: 'Выберите чат, чтобы начать общаться.',
      },
    });

    props.accountLink = new Link({
      className: 'chats-account',
      href: '/src/pages/settings-page/settings-page.html',
      text: 'Аккаунт',
    });

    props.searchForm = new Form(
      {
        className: 'chats-search-box',
        button: {
          className: 'chats-search-btn',
          typeName: 'button',
          text: '',
          events: {
            click: () => {
              if (props.searchForm.validate()) {
                console.log(props.searchForm.get_data());
              }
            },
          },
        },
        fields: [{
          input: {
            className: 'chats-search-input',
            name: 'chat_search',
            placeholder: '',
            inputType: 'text',
          },
          validator: Validator.validateSearch,
        }],

      },
    );
    props.chatsList = chatList;
    super('div', props);
  }

  showMessageChain(userId: number) {
    this.children.messageChain.show();
    this.children.chatPlug.hide();
    this.children.messageChain.setCurrentMessage(userId);
    return true;
  }

  render() {
    return this.compile(greetings, this.props);
  }
}

export const chatPage = new ChatPage({});

render('#app', chatPage);
