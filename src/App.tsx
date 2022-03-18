import React from 'react';
import './App.css';
import QueryExample from './QueryExample';
import SubscriptionExample from './SubscriptionExample';

function App() {
  return (
    <div>
      {!process.env.REACT_APP_API_TOKEN &&
        <strong style={{ color: "red" }}>API TOKEN MISSING! Check instructions and it to your .env file.</strong>
      }

      <h2>GraphQL Query example</h2>
      <QueryExample />

      <h2>GraphQL Subscription example</h2>
      <SubscriptionExample />
    </div>
  );
}

export default App;
