import React from "react";
import { updateProduct } from '../axios-services'

const AdminEditProduct = (props) => {
    const { user, product } = props;

    const handleEditProduct = async () => {

        console.log(user, product)
    }

    return (
        <button className="pdp-edit-product-button" onClick={handleEditProduct}>Edit Product</button>
    )
}

export default AdminEditProduct;