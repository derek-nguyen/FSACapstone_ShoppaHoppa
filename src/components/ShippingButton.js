import React from "react";
import { useHistory } from "react-router-dom";

const ShippingButton = (subtotal) => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/checkout/shipping");
  };

  return (
    <button className="shipping-button" onClick={handleClick}>
      Proceed to Shipping
    </button>
  );
};

export default ShippingButton;
