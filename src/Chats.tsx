import React from 'react';
import { useQuery, gql } from '@apollo/client';

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

interface ChatsProps {
  setCurrentChatId: React.Dispatch<React.SetStateAction<string>>;
}

function Chats({ setCurrentChatId }: ChatsProps) {
  const { data } = useQuery<ChatsData>(CHATS_QUERY);

  const chats = data?.chats;

  const handleClick = (chat: Chat) => () => {
    setCurrentChatId(chat.id);
  };

  return (
    <ul>
      {chats?.map((chat) => (
        <li key={chat.id} onClick={handleClick(chat)}>
          <strong>{chat.contact.name}</strong>
          <sub>{chat.lastMessage.text}</sub>
        </li>
      ))}
    </ul>
  );
}

export default Chats;
