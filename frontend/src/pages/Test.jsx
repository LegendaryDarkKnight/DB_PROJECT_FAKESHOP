import { useState, useEffect } from 'react';

import '../styles/MessagingApp.css'; // Import your CSS file for styling

const MessagingApp = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Dummy user IDs
  const user1 = 'User1';
  const user2 = 'User2';

  useEffect(() => {
    // Simulate initial messages
    const initialMessages = [
      { sender: user1, text: 'Hello, how are you?' },
      { sender: user2, text: 'I\'m good, thanks!' },
    ];
    setMessages(initialMessages);
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    // Simulate sending a message
    const updatedMessages = [...messages, { sender: user1, text: newMessage }];
    setMessages(updatedMessages);
    setNewMessage('');
  };

  return (
    <div className="messenger-container">
      <div className="messenger-header">Messenger</div>
      <div className="message-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === user1 ? 'left' : 'right'}`}
          >
            <div className="message-text">{message.text}</div>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default MessagingApp;
