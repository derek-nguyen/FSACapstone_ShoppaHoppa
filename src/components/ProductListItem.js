import { React } from "react";
import { Link } from "react-router-dom"
import { checkUserCartExists, createNewCart, addProductToCart, removeProductFromDB, fetchAllProducts } from "../axios-services/index";
import Swal from 'sweetalert2';

const ProductListItem = (props) => {
    const { product, user, sessionId, setProducts } = props;

    const handleDelete = async () => {
        try {
          const confirmationResult = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
          });
      
          if (confirmationResult.isConfirmed) {
            // User confirmed the delete action
            const remove = await removeProductFromDB(product.prodid);
            if (remove) {
              console.log('Product deleted successfully');
              const productsData = await fetchAllProducts();
              setProducts(productsData);
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            }
          }
        } catch (error) {
          console.error('Error deleting product:', error);
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