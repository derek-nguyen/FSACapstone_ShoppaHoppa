// import React from 'react';



// const OrderItem = ({order}) => {
//   const formatPriceWithCommas = (price) => {
//     const formattedPrice = parseFloat(price).toFixed(2);
//     return formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   };

//   const formatDate = (isoDate)  => {
//     const options = {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//       hour: "numeric",
//       minute: "numeric",
//       hour12: true,
//       timeZone: "PST",
//     };
//     const formattedDate = new Date(isoDate).toLocaleString("en-US", options);
//     return formattedDate;
//   }

//   return (
//     <tr>
//       <td>
//         <img
//           className="orders-img"
//           src={order.orderprodimg}
//           alt="Product Image"
//         />
//         </td>
//         <td>
//         <div className="order-info">
//           <p>Order Date: {formatDate(order.orderdate)}</p>
//           <p>Order Number: {order.orderid}</p>
//           <p>Model: {order.orderprodmodelname}</p>
//           <p>Qty: {order.orderqty}</p>
//         </div>
//       </td>
//       <td>
//         <p className="align-top">{order.orderstatus}</p>
//       </td>
//       <td>
//         <p className="align-top">${formatPriceWithCommas(order.ordertotalprice)}</p>
//       </td>
//     </tr>
//   );
// };

// export default OrderItem;
