import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { create as createAbsintheSocket } from "@absinthe/socket";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { Socket as PhoenixSocket } from "phoenix";

// Access Token
const ACCESS_TOKEN = process.env.REACT_APP_API_TOKEN;

// GrahpQL API endpoints
const HTTP_ENDPOINT = "https://chatty.gigalixirapp.com/api";
const WS_ENDPOINT = "wss://chatty.gigalixirapp.com/socket";

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

// Create a standard Phoenix websocket connection.
const phoenixSocket = new PhoenixSocket(WS_ENDPOINT, {
    params: { Authorization: ACCESS_TOKEN ? `Bearer ${ACCESS_TOKEN}` : "" }
});

// Wrap the Phoenix socket in an AbsintheSocket.
const absintheSocket = createAbsintheSocket(phoenixSocket);

// Create Web Socket Apollo link.
const wsLink = createAbsintheSocketLink(absintheSocket);

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
    wsLink as unknown as ApolloLink,
    authedHttpLink,
);

// Create Apollo Client
const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});

export default client;