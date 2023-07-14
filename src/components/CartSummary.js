import React, { useEffect, useState } from "react";
import { CartItem, CheckoutButton, ProductCarousel } from "../components";
import { fetchProductsCart } from "../axios-services";
import { useHistory } from "react-router-dom";

const CartSummary = (props) => {
  const { user, sessionId } = props;
  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const history = useHistory();

  useEffect(() => {
    async function fetchCartData() {
      try {
        const response = await fetchProductsCart(user?.id || null, sessionId);
        const productsWithIds = response.map((product) => ({
          ...product,
          cartItemId: product.cartprodid 
        }));
        setProducts(productsWithIds);
      } catch (error) {
        console.error(error);
      }
    }

    const timer = setTimeout(() => {
      fetchCartData();
    }, 100);

    return () => clearTimeout(timer);
  }, [user, sessionId]);

  useEffect(() => {
    const calculateSubtotal = () => {
      let total = 0;
      products.forEach((product) => {
        total += product.cartprodprice * product.cartquantity;
      });
      setSubtotal(total);
    };

    calculateSubtotal();
  }, [products]);

  const formatPriceWithCommas = (price) => {
    const formattedPrice = parseFloat(price).toFixed(2);
    return formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleViewProducts = () => {
    history.push("/products");
  };

  return (
    <>
      <div className="cart-container">
        <h3>Your Cart</h3>
        {products.length > 0 ? (
          <table className="cart-table">
            <thead>
              <tr className="cart-table-header">
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <CartItem
                  key={product.cartItemId}
                  product={product}
                  user={user}
                  sessionId={sessionId}
                  fetchProductsCart={fetchProductsCart}
                  setProducts={setProducts}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty-cart-message">Your cart is empty.</p>
        )}
        {products.length > 0 && (
          <p className="subtotal">Subtotal: ${formatPriceWithCommas(subtotal)}</p>
        )}
      </div>
      <div className="cart-action-buttons">
        <button className="view-products-button" onClick={handleViewProducts}>
          {products.length > 0 ? "Continue Shopping" : "Shop All Products"}
        </button>
        {products.length > 0 && (
          <div>
            <CheckoutButton product={products} setProducts={setProducts} user={user} sessionId={sessionId} />
          </div>
        )}
      </div>
      <div>
          <ProductCarousel />
      </div>
    </>
  );
};

export default CartSummary;
