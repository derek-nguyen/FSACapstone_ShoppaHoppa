import React, { useState, useEffect } from "react";
import { updatedProductCart, handleRemoveFromCart } from '../axios-services'

const UpdateQty = (props) => {
  const { product, user, sessionId, fetchProductsCart, setProducts } = props;

  const [cartQuantity, setCartQuantity] = useState(product.cartquantity);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setCartQuantity(product.cartquantity);
  }, [product.cartquantity]);

  const handleQuantity = async (quantity) => {
    const updatedQuantity = product.cartquantity + quantity;
    const updatedTotalPrice = product.cartprodprice * updatedQuantity;
    try {
      await updatedProductCart(product.cartid, product.cartprodid, updatedQuantity, updatedTotalPrice);
      setProducts(prevProducts => {
        const updatedProducts = [...prevProducts];
        const updatedProductIndex = updatedProducts.findIndex(p => p.cartprodid === product.cartprodid);
        if (updatedProductIndex !== -1) {
          updatedProducts[updatedProductIndex] = {
            ...updatedProducts[updatedProductIndex],
            cartquantity: updatedQuantity,
            carttotalprice: updatedTotalPrice
          };
        }
        return updatedProducts;
      });
    } catch (error) {
      console.error(error);
    }

    if (updatedQuantity < 1) {
      await handleRemoveFromCart(product.cartid, product.cartprodid);
      setProducts(prevProducts => prevProducts.filter(p => p.cartprodid !== product.cartprodid));
    }
  }

  return (
    <>
      <div className="quantity-container">
        <button className="quantity-button" onClick={() => handleQuantity(-1)}>-</button>
        <span className="quantity-display">Qty: {cartQuantity}</span>
        <button className="quantity-button" onClick={() => handleQuantity(1)}>+</button>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
};

export default UpdateQty;