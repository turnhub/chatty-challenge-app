import React from 'react';
import { useQuery, gql } from "@apollo/client";

const CHATS_QUERY = gql`
  query Chats {
    chats {
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

interface ChatsData {
  chats: Chat[];
}

function QueryExample() {
  const { data } = useQuery<ChatsData>(CHATS_QUERY);

  const chats = data?.chats;

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

export default QueryExample;
