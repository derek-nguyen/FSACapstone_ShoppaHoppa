import React, { useState, useEffect } from "react";
import { checkUserCartExists, createNewCart, addProductToCart } from "../axios-services/index"
import { AdminEditProduct } from '../components';
import Swal from 'sweetalert2';

const ProductDetails = (props) => {
  const { product, user, sessionId, setProduct } = props;

  const addToCartHandler = async () => {
    try {
      if (!user) {
        const _userCartExists = await checkUserCartExists(null, sessionId);

        if (!_userCartExists) {
          const createdGuestCart = await createNewCart(null, sessionId);
          console.log(createdGuestCart);
        } else {
          const productData = {
            prodId: product.prodid,
            prodModelName: product.prodmodelname,
            prodDescription: product.proddescription,
            prodImg: product.prodimg,
            quantity: 1,
            prodPrice: product.prodprice,
            totalPrice: product.prodprice * 1,
            cartId: _userCartExists.cartid
          };

          const addedUserProduct = await addProductToCart(productData);

          if (addedUserProduct) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Product added',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                title: 'alert-font'
              }
            })
          }
        }
      } else if (user) {
        const _userCartExists = await checkUserCartExists(user.id, sessionId);

        if (!_userCartExists) {
          await createNewCart(user.id || null, sessionId);
        } else {
          const productData = {
            prodId: product.prodid,
            prodModelName: product.prodmodelname,
            prodDescription: product.proddescription,
            prodImg: product.prodimg,
            quantity: 1,
            prodPrice: product.prodprice,
            totalPrice: product.prodprice * 1,
            cartId: _userCartExists.cartid
          };

          const addedUserProduct = await addProductToCart(productData);

          if (addedUserProduct) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Product added',
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                title: 'alert-font'
              }
            })
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const formatPriceWithCommas = (price) => {
    const formattedPrice = parseFloat(price).toFixed(2);
    return formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (!product) {
    return (
      <div className="page-error-display">
        It appears this page does not exist in our system. Please head back to the all products page for a better experience.
      </div>
    );
  }

  return (
    <>
      <div className="pdp-display-container">
        <div className="pdp-img-container">
          <img className="pdp-img" src={product.prodimg} alt={product.prodmodelnname} />
        </div>
        <div className="pdp-details-container">
          <h3 className="pdp-model-name-title">{product.prodmodelname}</h3>
          <hr></hr>
          <p className="pdp-brand-title"> {product.brand}</p>
          <p>${formatPriceWithCommas(product.prodprice)}</p>
          <button className="pdp-a2c-button" onClick={addToCartHandler}>Add To Cart</button>
          {user?.role === "admin" ? <AdminEditProduct product={product} user={user} setProduct={setProduct} /> : <></>}
        </div>
        <div className="pdp-description-container">
          <h4 className="pdp-descprition-title">Description</h4>
          <p>{product.proddescription}</p>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
