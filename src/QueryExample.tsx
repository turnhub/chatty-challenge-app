import React from 'react';
import { useQuery, gql } from "@apollo/client";

/**
 * This is just an example to check that the connection to the GraphQL API works.
 * 
 * Please explore the GraphQL API schema (see instructions in README) for more information
 * on the API and the GraphQL fields that are available to you.
 */

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
  const { data, error, loading } = useQuery<ChatsData>(CHATS_QUERY);

  if (loading) return (<p>Loading...</p>);
  if (error) return (<p>{`Error! ${error.message}`}</p>);

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
