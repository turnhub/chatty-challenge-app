import React from 'react';
import './App.css';
import QueryExample from './QueryExample';
import SubscriptionExample from './SubscriptionExample';

function App() {
  return (
    <div>
      <h2>GraphQL Query example</h2>
      <QueryExample />

      <h2>GraphQL Subscription example</h2>
      <SubscriptionExample />
    </div>
  );
}

export default App;
