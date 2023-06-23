import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import {
  getSomething
} from '../api';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    getSomething()
      .then(response => {
        setMessage(response.message);
      })
      .catch(error => {
        setMessage(error.message);
      });
  });

  return (
    <>
      <nav id='navbar'>
        <div className='links'>
          <Link to="/">All Products</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/brands">Brands</Link>
        </div>
      </nav>
    </>
  );
}

export default App;


/*
Create the following routes:
# Register
# Login
# Home
# PDP 
*/