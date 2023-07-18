import React, { useEffect, useState } from "react";
import { fetchMyOrders } from "../axios-services";


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

      const formatDate = (isoDate)  => {
        const options = {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          timeZone: "UTC", // Use "UTC" to ensure the date is parsed correctly
        };
        const formattedDate = new Date(isoDate).toLocaleString("en-US", options);
        return formattedDate;
      }

    return (
      <>
        <div className="order-cards">
          <div className="order-table">
            <table>
              <thead>
                <tr className="order-column">
                  <th>Product</th>
                  <th>Order Info</th>
                  <th>Status</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {myOrders.length > 0 ? (
                  myOrders.map((order) => (
                    <tr key={order.orderid}>
                      <td>
                        <img
                          className="orders-img"
                          src={order.orderprodimg}
                          alt="Product Image"
                        />
                      </td>
                      <td>
                        <div className="order-info">
                          <p>Order Date: {formatDate(order.orderdate)}</p>
                          <p>Order Number: {order.orderid}</p>
                          <p>Model: {order.orderprodmodelname}</p>
                          <p>Qty: {order.orderqty}</p>
                        </div>
                      </td>
                      <td>
                        <p className="align-top">{order.orderstatus}</p>
                      </td>
                      <td>
                        <p className="align-top">${formatPriceWithCommas(order.ordertotalprice)}</p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No order details available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };
  
  export default MyItems;
  
  