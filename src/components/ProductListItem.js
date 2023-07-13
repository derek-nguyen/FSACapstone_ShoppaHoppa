import { React } from "react";
import { Link } from "react-router-dom"
import { checkUserCartExists, createNewCart, addProductToCart, removeProductFromDB, fetchAllProducts } from "../axios-services/index"

const ProductListItem = (props) => {
    const { product, user, sessionId, setProducts } = props;

    const handleDelete = async () => {
        try {
            const remove = await removeProductFromDB(product.prodid);
            if (remove) {
                console.log("Product deleted successfully");
                const productsData = await fetchAllProducts();
                setProducts(productsData)
            }

        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const formatPriceWithCommas = (price) => {
        const formattedPrice = parseFloat(price).toFixed(2);
        return formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className="plp-item">
            <Link to={`/products/${product.prodid}`}>
                <img src={product.prodimg} alt="" />
            </Link>
            <h3>{product.prodmodelname}</h3>
            <p>${formatPriceWithCommas(product.prodprice)}</p>
            {user && user.role === "admin" && (
                <button className="delete-button" onClick={handleDelete}>
                    Delete
                </button>
            )}
        </div>
    )
}

export default ProductListItem;