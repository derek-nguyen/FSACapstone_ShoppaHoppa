import React from "react";
import { Link } from "react-router-dom"
import { checkUserCartExists, createNewCart, addProductToCart } from "../axios-services/index"


const ProductListItem = (props) => {
  const { product, user, sessionId } = props;

  const addToCartHandler = async () => {
    try {
      if (!user) {
        const _userCartExists = await checkUserCartExists(null, sessionId);

        if (!_userCartExists) {
          const createdGuestCart = await createNewCart(null, sessionId);
          const createdGuestCartJSON = JSON.parse(createdGuestCart);

          const productData = {
            prodId: product.prodid,
            prodModelName: product.prodmodelname,
            prodDescription: product.proddescription,
            prodImg: product.prodimg,
            quantity: 1,
            prodPrice: product.prodprice,
            totalPrice: product.prodprice * 1,
            cartId: createdGuestCartJSON.cartid
          };

          const addedUserProduct = await addProductToCart(productData);

          if (addedUserProduct.ok) {
            alert('Product added!')
          }
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
            alert('Product added!');
          }
        }
      } else if (user) {
        const _userCartExists = await checkUserCartExists(user.id, sessionId);

        if (!_userCartExists) {
          const newCart = await createNewCart(user.id || null, sessionId);
          const newCartJSON = JSON.parse(newCart)

          const productData = {
            prodId: product.prodid,
            prodModelName: product.prodmodelname,
            prodDescription: product.proddescription,
            prodImg: product.prodimg,
            quantity: 1,
            prodPrice: product.prodprice,
            totalPrice: product.prodprice * 1,
            cartId: newCartJSON.cartid
          };

          const addedUserProduct = await addProductToCart(productData);

          if (addedUserProduct) {
            alert('Product added!')
          }


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
            alert('Product added!');
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="plp-item">
      <Link to={`/products/${product.prodid}`}>
        <img src={`${product.prodimg}`}></img>
      </Link>
      <h3>{product.prodmodelname}</h3>
      <p>${product.prodprice}</p>
      <button className="add-to-cart" onClick={addToCartHandler}>Add to Cart</button>
    </div>
  )
}

export default ProductListItem;