import React, { useState } from "react";
import { updateProduct } from '../axios-services';

const AdminEditProduct = (props) => {
    const { user, product } = props;

    // console.log(product)

    const [isOpen, setIsOpen] = useState(false);
    const [productData, setProductData] = useState({
        ...product
    });

    console.log(productData)
    // const [productData, setProductData] = useState({
    //     prodId: "",
    //     brand: "",
    //     prodPrice: "",
    //     inventory: "",
    //     prodModelName: "",
    //     prodDescription: "",
    //     prodImg: "",
    // });

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here (e.g., updateProduct or API call)
    };

    const handleEditProduct = () => {
        openModal();
    };

    return (
        <div>
            <button className="pdp-edit-product-button" onClick={handleEditProduct}>Edit Product</button>

            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Edit Product</h2>

                        <form onSubmit={handleSubmit} className="product-form">
                            <div className="form-group">
                                <div className="grid-container">
                                    <div className="grid-item">
                                        <label htmlFor="prodId">Product ID:</label>
                                        <input
                                            type="text"
                                            name="prodId"
                                            value={productData.prodId}
                                            onChange={handleInputChange}
                                            placeholder="Product ID"
                                            required
                                        />
                                    </div>
                                    <div className="grid-item">
                                        <label htmlFor="brand">Brand:</label>
                                        <input
                                            type="text"
                                            name="brand"
                                            value={productData.brand}
                                            onChange={handleInputChange}
                                            placeholder="Brand"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="grid-container">
                                    <div className="grid-item">
                                        <label htmlFor="prodPrice">Product Price:</label>
                                        <input
                                            type="number"
                                            name="prodPrice"
                                            value={productData.prodPrice}
                                            onChange={handleInputChange}
                                            placeholder="Product Price"
                                            required
                                        />
                                    </div>
                                    <div className="grid-item">
                                        <label htmlFor="inventory">Inventory:</label>
                                        <input
                                            type="number"
                                            name="inventory"
                                            value={productData.inventory ? productData.inventory : 0}
                                            onChange={handleInputChange}
                                            placeholder="Inventory"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="prodModelName">Product Model Name:</label>
                                <input
                                    type="text"
                                    name="prodModelName"
                                    value={productData.prodmodelname}
                                    onChange={handleInputChange}
                                    placeholder="Product Model Name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="prodDescription">Product Description:</label>
                                <textarea
                                    name="prodDescription"
                                    value={productData.proddescription}
                                    onChange={handleInputChange}
                                    placeholder="Product Description"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="prodImg">Product Image URL:</label>
                                <input
                                    type="text"
                                    name="prodImg"
                                    value={productData.prodImg}
                                    onChange={handleInputChange}
                                    placeholder="Product Image URL"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-create">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminEditProduct;
