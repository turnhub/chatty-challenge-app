import React from 'react';
import { gql, useSubscription } from "@apollo/client";

const CHAT_CHANGED_SUBSCRIPTION = gql`
  subscription ChatChanged {
    chatChanged {
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

interface ChatChangedSubscriptionData {
  chatChanged: Chat;
}

function SubscriptionExample() {
  const { data } = useSubscription<ChatChangedSubscriptionData>(CHAT_CHANGED_SUBSCRIPTION);

  const chat = data?.chatChanged;

  return (
    <div>
      {chat ?
        (
          <div>Chat with {chat.contact.name} - Last message: {chat.lastMessage.text}</div>
        )
        :
        (
          <div>No data received from subscription yet</div>
        )}
    </div>

  );
}

export default SubscriptionExample;
