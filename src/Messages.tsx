import React from 'react';
import { useQuery, gql } from '@apollo/client';
import SendMessage from './SendMessage';

const MESSAGES_QUERY = gql`
  query Messages($chatId: ID!) {
    messages(chatId: $chatId) {
      id
      text
      insertedAt
    }
  }
`;

interface Message {
  id: string;
  text: string;
  insertedAt: string;
}

interface MessagesData {
  messages: Message[];
}

interface MessagesProps {
  currentChatId: string;
}

function Messages({ currentChatId }: MessagesProps) {
  const { data } = useQuery<MessagesData>(MESSAGES_QUERY, {
    variables: { chatId: currentChatId },
  });

  const messages = data?.messages;

  return messages ? (
    <>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <p>{message.text}</p>
            <sub>Time sent: {message.insertedAt}</sub>
          </li>
        ))}
      </ul>
      <SendMessage currentChatId={currentChatId} />
    </>
  ) : (
    <div className="no-chat">
      <p>Please select a chat</p>
    </div>
  );
}

export default Messages;
