import React from 'react';
import Cookies from 'js-cookie';

const TestComponent = () => {
  const handleSetCookie = () => {
    Cookies.set('testCookie1', 'Hello, Cookie!');
  };

  const handleGetCookie = () => {
    const cookieValue = Cookies.get('testCookie');
    console.log('Test Cookie Value:', cookieValue);
  };

  return (
    <div>
      <button onClick={handleSetCookie}>Set Cookie</button>
      <button onClick={handleGetCookie}>Get Cookie</button>
    </div>
  );
};

export default TestComponent;
