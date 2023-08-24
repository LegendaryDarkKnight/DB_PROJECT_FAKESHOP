import React from 'react'
import LogIn from './pages/LogIn';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Details from './pages/Details';
import Products from './pages/Products';
import Cart from "./pages/Cart";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
export const UserContext = React.createContext();

const App = () => {
  const [userData, setUserData] = useState(null);
  const [walletStatus, setWalletStatus] = useState('');
  return (
    <>
      <UserContext.Provider value={{ userData, setUserData, walletStatus, setWalletStatus }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Products />}></Route>
            <Route path='/login' element={<LogIn />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/home/:userID' element={<Home />}></Route>
            <Route path='/details/:title' element={<Details />}></Route>
            <Route path='/cart/:userID' element={<Cart/>}></Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;