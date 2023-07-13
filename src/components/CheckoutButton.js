import React from "react";
import { useHistory } from "react-router-dom";
import { createNewOrder, handleRemoveFromCart, fetchProductsCart } from "../axios-services";

const CheckoutButton = (props) => {
  const { user, product, setProducts, sessionId } = props;
  const history = useHistory();
  console.log(user)

  const handleCheckout = async () => {
    try {
      let userId = user ? user.id : 99; // Assign user ID or 99 if user is null
      
      let orderItems;
      if (product.length === 1) {
        const item = product[0];
        orderItems = [{
          orderProdId: item.cartprodid,
          orderProdModelName: item.cartprodname,
          orderQty: item.cartquantity,
          userIdOrder: userId,
          orderProdImg: item.prodimg,
          orderProdPrice: item.carttotalprice,
        }];
      } else {
        orderItems = product.map((item) => ({
          orderProdId: item.cartprodid,
          orderProdModelName: item.cartprodname,
          orderQty: item.cartquantity,
          userIdOrder: userId,
          orderProdImg: item.prodimg,
          orderProdPrice: item.carttotalprice,
        }));
      }

      const newOrder = await createNewOrder(orderItems, userId);
      console.log("New Order:", newOrder);

      for (const item of product) {
        await handleRemoveFromCart(item.cartid, item.cartprodid);
      }
      const updatedProducts = await fetchProductsCart(userId, sessionId);
      setProducts(updatedProducts);
      history.push("/confirmation");
    } catch (error) {
      console.error("Error creating orders:", error);
    }
  };

  return (
    <button className="checkout-button" onClick={handleCheckout}>
      Checkout
    </button>
  );
};

export default CheckoutButton;
