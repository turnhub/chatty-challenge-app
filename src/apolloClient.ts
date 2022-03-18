import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

/**
 * The code in this file configures the React Aoollo Client
 * so that it is able to connect to the provided GraphQL API
 * both over HTTP and websockets (for GraphQL subscriptions).
 */

// API Access Token
// Please remember to add your API token to your `.env` file
// as explained in the instructions.
const ACCESS_TOKEN = process.env.REACT_APP_API_TOKEN;

// GrahpQL API endpoints
const HTTP_ENDPOINT = "https://chatty.gigalixirapp.com/graphql";
const WS_ENDPOINT = "wss://chatty.gigalixirapp.com/graphql/ws";

// Create HTTP Apollo link.
const httpLink = createHttpLink({ uri: HTTP_ENDPOINT });

// Create Apollo Auth link to add authentication header
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: ACCESS_TOKEN ? `Bearer ${ACCESS_TOKEN}` : "",
        }
    }
});

// Add authorization header to Apollo HTTP link
const authedHttpLink = authLink.concat(httpLink);

// Create Web Socket Apollo link.
const wsLink = new GraphQLWsLink(createClient({
    url: WS_ENDPOINT,
    connectionParams: { token: ACCESS_TOKEN },
}));

// Create a split Apollo link that uses the Web Socket link for subscriptions
// and the HTTP link for queries and mutations
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    authedHttpLink,
);

// Create Apollo Client
const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});

export default client;