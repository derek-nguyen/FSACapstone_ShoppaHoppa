import React from "react";
import { RemoveFromCart, UpdateQty } from "../components";

const CartItem = (props) => {
    const { product, user, sessionId, fetchProductsCart, setProducts, index } = props;
    
    const formatPriceWithCommas = (price) => {
        const formattedPrice = parseFloat(price).toFixed(2);
        return formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };

    return (
        <tr>
            <td>{product.cartprodname}</td>
            <td>${formatPriceWithCommas(product.cartprodprice)}</td>
            <td>
                <UpdateQty
                    index={index}
                    product={product}
                    user={user}
                    sessionId={sessionId}
                    fetchProductsCart={fetchProductsCart}
                    setProducts={setProducts}
                />
            </td>
            <td>${formatPriceWithCommas(product.carttotalprice)}</td>
            <td>
                <RemoveFromCart
                    product={product}
                    user={user}
                    sessionId={sessionId}
                    fetchProductsCart={fetchProductsCart}
                    setProducts={setProducts}
                />
            </td>
        </tr>
    )
}

export default CartItem;