import React from 'react';
import { gql, useSubscription } from "@apollo/client";

/**
 * This is just an example to check that the connection to the GraphQL API works.
 * 
 * Please explore the GraphQL API schema (see instructions in README) for more information
 * on the API and the GraphQL fields that are available to you.
 */

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
  const { data, error } = useSubscription<ChatChangedSubscriptionData>(CHAT_CHANGED_SUBSCRIPTION);

  if (error) return (<p>{`Error! ${error.message}`}</p>);

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
