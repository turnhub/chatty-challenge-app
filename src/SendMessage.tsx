import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';
const SEND_MESSAGES_MUTATION = gql`
  mutation Messages($chatId: ID!, $text: String!) {
    sendMessage(chatId: $chatId, text: $text) {
      id
      text
    }
  }
`;

interface SendMessageProps {
  currentChatId: string;
}

function SendMessage({ currentChatId }: SendMessageProps) {
  const [message, setMessage] = useState('');
  const [sendMessage] = useMutation(SEND_MESSAGES_MUTATION);

  function handleChange(e: any) {
    setMessage(e.target.value);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    sendMessage({
      variables: { chatId: currentChatId, text: message },
    });
  }

  return (
    <form className="send-message" onSubmit={handleSubmit}>
      <input type="text" value={message} onChange={handleChange} />
      <input type="submit" value="Send message" />
    </form>
  );
}

export default SendMessage;
