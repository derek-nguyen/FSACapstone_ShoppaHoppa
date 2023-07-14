import React, { useEffect, useState } from "react";
import { ProductListItem } from "../components";
import { fetchAllProducts } from "../axios-services";

const ProductListPage = (props) => {
  const { user, sessionId } = props;

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchAllProducts();
        setProducts(productsData);
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
        const filtered = products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
      }
    };

    filterProducts();
  }, [products, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="plp-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
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
  );
};

export default ProductListPage;
