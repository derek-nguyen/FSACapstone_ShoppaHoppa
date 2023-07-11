import React from 'react';
import { useHistory } from 'react-router-dom';

const CheckoutButton = () => {

  const handleCheckout = () => {
    const history = useHistory();
    history.push('/confirmation');
  }

  return (
    <>
    <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
    </>
  )
};

export default CheckoutButton;
