import React, { useEffect, useState } from "react";
import { updateProduct } from '../axios-services';
import { fetchProdId } from '../axios-services'

const AdminEditProduct = (props) => {
    const { product, setProduct } = props;

    // console.log(product)

    const [isOpen, setIsOpen] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);


    // console.log(productData)
    const [productData, setProductData] = useState({
        prodId: "",
        brand: "",
        prodPrice: "",
        inventory: "",
        prodModelName: "",
        prodDescription: "",
        prodImg: "",
    });

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedData = filterEmptyProperties(productData)
        // Handle form submission here (e.g., updateProduct or API call)
        try {
            const response = await updateProduct(product.prodid, updatedData);

            if (response.ok) {
                setIsUpdated(true);
            }
        } catch (error) {
            console.error(error);
        }

    };

    useEffect(() => {
        if (isUpdated) {
            setIsUpdated(false);
            closeModal();

            fetchProdId(product.prodid)
                .then((product) => {
                    setProduct(product);
                })
        }
    }, [isUpdated])

    const handleEditProduct = () => {
        openModal();
    };

    const filterEmptyProperties = (data) => {
        const filteredData = {};
        Object.entries(data).forEach(([key, value]) => {
            if (value !== "") {
                filteredData[key] = value;
            }
        });
        return filteredData;
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
                                            value={`${product.prodid} - Not Editable`}
                                            onChange={handleInputChange}
                                            placeholder="Non-editable Product ID"
                                            disabled
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
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="prodModelName">Product Model Name:</label>
                                <input
                                    type="text"
                                    name="prodModelName"
                                    value={productData.prodModelName}
                                    onChange={handleInputChange}
                                    placeholder="Product Model Name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="prodDescription">Product Description:</label>
                                <textarea
                                    name="prodDescription"
                                    value={productData.prodDescription}
                                    onChange={handleInputChange}
                                    placeholder="Product Description"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="prodImg">Product Image URL:</label>
                                <input
                                    type="text"
                                    name="prodImg"
                                    value={productData.prodImg}
                                    onChange={handleInputChange}
                                    maxLength={"255"}
                                    placeholder="Product Image URL"
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
