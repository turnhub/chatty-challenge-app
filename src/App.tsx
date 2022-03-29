import React, { useState } from 'react';
import './App.css';
import Chats from './Chats';
import Messages from './Messages';
// import SubscriptionExample from './SubscriptionExample';

function App() {
  const [currentChatId, setCurrentChatId] = useState('');

  return (
    <div className="chatty-app">
      <div className="chats">
        <Chats setCurrentChatId={setCurrentChatId} />
      </div>

      <div className="messages">
        <Messages currentChatId={currentChatId} />
      </div>
      {/* <div>
        <h2>GraphQL Subscription example</h2>
        <SubscriptionExample />
      </div> */}
    </div>
  );
}

export default App;
