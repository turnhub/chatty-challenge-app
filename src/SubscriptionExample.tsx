import React from 'react';
import { gql, useSubscription } from "@apollo/client";

const CHATS_SUBSCRIPTION = gql`
  subscription OnChatsListChanged {
    chatsListChanged {
      id
      contact {
          name
      }
      lastMessage {
          text
      }
    }
  }
`;

interface Contact {
  name: string;
  phoneNumber: string;
}

interface Message {
  text: string;
}

interface Chat {
  id: string;
  contact: Contact;
  lastMessage: Message;
}

interface ChatsSubscriptionData {
  chatsListChanged: Chat[];
}

function SubscriptionExample() {
  const { data } = useSubscription<ChatsSubscriptionData>(CHATS_SUBSCRIPTION);

  const chats = data?.chatsListChanged;

  return (
    <ul>
      {chats?.map((chat) => (
        <li key={chat.id}>
          Chat with {chat.contact.name} - Last message: {chat.lastMessage.text}
        </li>
      ))}
    </ul>
  );
}

export default SubscriptionExample;
