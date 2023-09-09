 import { useState, useEffect } from 'react';

import '../styles/MessagingApp.css'; // Import your CSS file for styling

const MessagingApp = (props) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    // Dummy user IDs
    const user1 = props.user1;
    const user2 = props.user2;

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/getMessages', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({shopID: user2}),
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setMessages(data.rows)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const sendData = async () =>{
        try {
            const response = await fetch('http://localhost:3000/sendMessages', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({shopID: user2, text1:newMessage}),
                credentials: 'include',
            });
            if(!response.ok){
                console.log('Network error');
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const sendMessage = async() => {
        if (newMessage.trim() === '') return;
        await sendData();
        const updatedMessages = [...messages, {FROM_USER: user1, TEXT: newMessage }];
        setMessages(updatedMessages);
        setNewMessage('');
    };

    return (
        <div className="messenger-container">
            <div className="messenger-header">Messages</div>
            <div className="message-container">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.FROM_USER === user1 ? 'left' : 'right'}`}
                    >
                        <div className="message-text">{message.TEXT}</div>
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
