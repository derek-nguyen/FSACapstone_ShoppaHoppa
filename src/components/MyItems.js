import React, { useEffect, useState } from "react";
import { fetchMyOrders } from "../axios-services";
import {OrderItem} from "../components";

const MyItems = (props) => {
  const { user, userToken } = props;
  const [myOrders, setMyOrders] = useState([]);
  const userId = user.id;

  useEffect(() => {
    const getMyOrders = async () => {
      try {
        const orders = await fetchMyOrders(userId, userToken);
        console.log("Orders:", orders);
        setMyOrders(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (userToken && userId) {
      getMyOrders();
    }
  }, [userToken, userId]);

  const formatPriceWithCommas = (price) => {
    const formattedPrice = parseFloat(price).toFixed(2);
    return formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };


  return (
    <>
      <h3 className="orderHeadline">Your Order History</h3>
      <div className="orders-card">
        <div className="order-table">
        {myOrders.length > 0 ? (
          <table>
            <thead>
              <tr className="order-column">
                <th className="order-product-table">Product</th>
                <th>Order Info</th>
                <th>Status</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((order) => (
                <OrderItem
                  key={order.orderid}
                  order={order}
                  user={user}
                  userToken={userToken}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty-cart-message">Your order history is empty.</p>
        )}
      </div>
      </div>
    </>
  );
};

export default MyItems;
