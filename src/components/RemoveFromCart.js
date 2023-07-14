import React, { useState, useEffect } from "react";
import { handleRemoveFromCart } from '../axios-services';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const RemoveFromCart = (props) => {
  const { product, user, sessionId, fetchProductsCart, setProducts } = props;

  const removeFromCart = async () => {
    try {
      const result = await handleRemoveFromCart(product.cartid, product.cartprodid);
      const products = await fetchProductsCart(user?.id || null, sessionId);
      setProducts(products);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DeleteForeverIcon className="cart-item-remove-icon" onClick={removeFromCart} />
  );
}

export default RemoveFromCart;
