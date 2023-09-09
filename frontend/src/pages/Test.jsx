import React, { useState, useEffect, useContext } from 'react';
import Menu from './Menu';
import { UserContext } from '../App';
import MessagingApp
  from './MessagingApp';
const messageViewStyle = {
  background: 'linear-gradient(to top, #0073e6, #9c27b0)',
  flex: 1,
  padding: '16px',
  borderLeft: '1px solid #ccc',
};

const buttonStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
};
const messageListStyle = {
  width: '350px',
  borderRight: '1px solid #ccc',
  padding: '0',
  margin: '0',
  backgroundColor: '#f8f8f8',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
};

const messageListHeaderStyle = {
  backgroundColor: '#00bfff',
  color: 'white',
  padding: '16px',
  fontSize: '20px',
  fontWeight: 'bold',
};

const messageListItemsStyle = {
  listStyle: 'none',
  padding: '0',
  margin: '0',
  overflowY: 'auto', // Enable vertical scrolling
  maxHeight: 'calc(100vh - 56px - 1px)', // Adjust the height as needed
}
const messageListItemStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',
  cursor: 'pointer',
  borderBottom: '1px solid #ccc',
};

const messageListItemTextStyle = {
  marginLeft: '16px',
  fontSize: '16px',
  fontWeight: 'bold',
};

const MessageList = ({ messages, onSelectPerson }) => {
  return (
    <>

      <div style={messageListStyle}>
        <div style={messageListHeaderStyle}>Chats</div>
        <ul style={messageListItemsStyle}>
          {messages.map((message, index) => (
            <li
              key={index}
              style={messageListItemStyle}
              onClick={() => onSelectPerson(message.USER_ID)}
            >
              <div>
                <img
                  src={`https://via.placeholder.com/40?text=${message.EMAIL.charAt(
                    0
                  )}`}
                  alt={`${message.EMAIL}'s profile`}
                  width="40"
                  height="40"
                  style={{ borderRadius: '50%' }}
                />
              </div>
              <div style={messageListItemTextStyle}>{message.EMAIL}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const MessageView = (props) => {

  return (
    <div style={messageViewStyle}>
      <div
        style={{
          background: `url('../../images/background1.jpg') no-repeat center center / cover`, // Background properties
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '8px',
          minHeight: '400px',
          overflowY: 'scroll',
        }}
      >
        {/* Pass the user2 prop to MessagingApp */}
        <MessagingApp user1={props.user1} user2={props.user2} />
      </div>


    </div>
  );
};


const App = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);


  const [messages, setMessages] = useState([
  ]);

  const onSelectPerson = (person) => {
    setSelectedPerson(person);
  };
  const getMessageList = async () => {
    try {
      const response = await fetch('http://localhost:3000/getMessageList', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        },
        credentials: 'include'
      })
      if (!response.ok) {
        alert('Some Error Occured')
      }
      const data = await response.json();
      setMessages(data.rows)
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMessageList();
  }, [])

  const { userData } = useContext(UserContext);
  return (
    <>
      <Menu />
      <div style={{ display: 'flex', height: '100vh' }}>
        <MessageList messages={messages} onSelectPerson={onSelectPerson} />
        {selectedPerson && (
          <MessageView key={selectedPerson} user2={selectedPerson} user1={userData.rows[0].USER_ID} />
        )}
      </div>
    </>
  );
};

export default App;
