import React, { useEffect, useState } from "react";
import { ProductListItem } from "../components";
import { fetchAllProducts } from "../axios-services";

const ProductListPage = (props) => {
  const { user, sessionId } = props;

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchAllProducts();
        setProducts(productsData);
        setTimeout(() => {
          setIsLoaded(true);
        }, 100);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      if (searchTerm === "") {
        setFilteredProducts(products);
      } else {
        const filtered = products.filter((product) => {
          const productName = product.prodmodelname?.toLowerCase();
          const brand = product.brand?.toLowerCase();
          return (
            (productName && productName.includes(searchTerm.toLowerCase())) ||
            (brand && brand.includes(searchTerm.toLowerCase()))
          );
        });
        setFilteredProducts(filtered);
      }
    };

    filterProducts();
  }, [products, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

    return (
        <>
          <div className={`search-container ${isLoaded ? "fade-in" : ""}`}>
            <input
              type="text"
              className="search-input"
              placeholder="Search brands and models"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
    
          <div className={`plp-container ${isLoaded ? "fade-in" : ""}`}>
            {/* Product list rendering */}
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductListItem
                  key={product.id}
                  product={product}
                  user={user}
                  sessionId={sessionId}
                  setProducts={setProducts}
                />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </>
      );
    };

export default ProductListPage;
