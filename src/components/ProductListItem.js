import { React } from "react";
import { Link } from "react-router-dom"
import { checkUserCartExists, createNewCart, addProductToCart, removeProductFromDB, fetchAllProducts } from "../axios-services/index";
import Swal from 'sweetalert2';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const ProductListItem = (props) => {
  const { product, user, sessionId, setProducts } = props;

  const handleDelete = async () => {
    try {
      const confirmationResult = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#000000',
        cancelButtonColor: '#000000',
        confirmButtonText: 'Yes, delete it!',
        customClass: {
          title: 'alert-font',
          text: 'alert-font',
          confirmButton: "alert-button",
          cancelButton: "alert-button",
        }
      });

      if (confirmationResult.isConfirmed) {
        const remove = await removeProductFromDB(product.prodid);
        if (remove) {
          console.log('Product deleted successfully');
          const productsData = await fetchAllProducts();
          setProducts(productsData);
          Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success",
            customClass: {
              title: "alert-font",
              confirmButton: "alert-button",
            },
          });
          
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
                <DeleteForeverIcon className="delete-button" onClick={handleDelete} />
            )}
        </div>
    )
}

export default ProductListItem;