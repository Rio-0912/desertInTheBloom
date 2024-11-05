import React, { useState } from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Pages/Layout';
import { SignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import UserProfileRio from './Pages/UserProfileRio';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Fav from './Components/Fav';
import AllOrders from './Components/AllOrder';
import Cart from './Pages/UserCart';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes >

          {/* profile seciton  */}

          <Route path='/profile' element={<Profile />} >
            <Route index element={<UserProfileRio />} />
            <Route path='/profile/orders' element={<AllOrders />} />
            <Route path='/profile/favorites' element={<Fav />} />
          </Route>

          <Route path='/' element={<Layout />} />

          <Route path="/sign-in" element={<SignIn signUpUrl='/login' forceRedirectUrl={'/'} fallbackRedirectUrl={'/'} />} />

          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/userProfile" element={<UserProfileRio />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
