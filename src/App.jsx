import React, { useState, useEffect } from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Pages/Layout';
import { SignIn, SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import UserProfileRio from './Pages/UserProfileRio';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import AllOrders from './Components/AllOrder';
import Cart from './Pages/UserCart';
import SingleProduct from './Pages/SingleProduct';
import AboutUs from './Pages/AboutUs';
import axios from 'axios';
import toast from 'react-hot-toast'
import OrderItems from './Components/OrderItems';

function App() {
  const { isSignedIn, user } = useUser();
  const saveToDb = async (dataToStore) => {
    try {
      const res = await axios.post(`http://localhost:8081/api/users`, dataToStore);
      if (res.status === 200) {
        toast.success('Profile Created');

      }
      else {
        toast.error('Profile Creation Failed');
      }
    } catch (error) {
      

    }
  };

  useEffect(() => {
    if (isSignedIn && user) {
      localStorage.setItem("userId", user.id?.slice(-10));
      const dataToStore = {
        id: user.id?.slice(-10),
        name: user.fullName,
        emailid: user.emailAddresses[0]?.emailAddress,
        phonenumber: user.phoneNumbers[0]?.phoneNumber,
      };
      console.log(dataToStore);
      saveToDb(dataToStore);
    }
  }, [isSignedIn, user]);



  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/profile' element={<Profile />} >
            <Route index element={<UserProfileRio />} />
            <Route path='/profile/orders' element={<AllOrders />} />
            <Route path='/profile/myorder/:orderId' element={<OrderItems />} />
          </Route>
          <Route path='/' element={<Layout />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path="/sign-in" element={<SignIn signUpUrl='/login' forceRedirectUrl={'/'} fallbackRedirectUrl={'/'} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/userProfile" element={<UserProfileRio  />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
