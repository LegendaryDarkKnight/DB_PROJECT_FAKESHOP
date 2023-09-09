import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, createContext } from 'react'
import LogIn from './pages/LogIn';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Details from './pages/Details';
import Products from './pages/Products';
import Cart from "./pages/Cart";
import Test from "./pages/Test";
import MyProducts from './pages/MyProducts';
import MyShop from './pages/MyShop';
import MyOrder from './pages/MyOrder';
import ShopOrder from './pages/ShopOrder'
import AdminHome from './AdminPages/Home';
import AdminLogin from './AdminPages/AdminLogin'
import TransactionTable from './AdminPages/TransactionTable';
import UserRequest from './AdminPages/Userrequest';
import PendinDelivery from './AdminPages/PendingDelivery'
import SearchProducts from './pages/SearchProducts';
import MyMessages from './pages/MyMessages';
export const UserContext = createContext();

const App = () => {
  const [userData, setUserData] = useState(null);
  return (
    <>
      <UserContext.Provider value={{ userData, setUserData }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Products />}></Route>
            <Route path='/login' element={<LogIn />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/home/' element={<Home />}></Route>
            <Route path='/details/:productID' element={<Details />}></Route>
            <Route path='/cart/' element={<Cart />}></Route>
            <Route path='/order/' element={<MyOrder />}></Route>
            <Route path='/myProducts/' element={<MyProducts/>}></Route>
            <Route path='/test/' element={<Test />}></Route>
            <Route path='/search/' element={<SearchProducts />}></Route>
            <Route path='/myShop/' element={<MyShop />}></Route>
            <Route path='/myMessages/' element={<MyMessages />}></Route>
            <Route path='/shopOrder/' element={<ShopOrder/>}></Route>
            <Route path='/admin/' element={<AdminHome/>}></Route>
            <Route path='/admin/login' element={<AdminLogin/>}></Route>
            <Route path='/admin/transaction' element={<TransactionTable/>}></Route>
            <Route path='/admin/userrequests' element={<UserRequest/>}></Route>
            <Route path='/admin/courier-service' element={<PendinDelivery/>}></Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;