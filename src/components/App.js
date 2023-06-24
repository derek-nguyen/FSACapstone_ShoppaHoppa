import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import {
  getSomething
} from '../api';

/* 
IMPORT REACT COMPONENTS BELOW
*/

import { Register } from '../components'



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
          <Link to="/register">Register</Link>
        </div>
      </nav>
      <Switch>
        <Route 
          path='/register'
          render={() => (
            <Register/>
          )}
        />
      </Switch>
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