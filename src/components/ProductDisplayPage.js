import React from "react";
import { ProductDetails, ProductCarousel } from '../components'
import { fetchProdId } from '../axios-services'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


const ProductDisplayPage = (props) => {
  const { user, sessionId, product, setProduct } = props;
  const { prodId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getPdp = async () => {
      const results = await fetchProdId(prodId);
      setProduct(results);
      setIsLoaded(true);
    };
    getPdp();
  }, [prodId]);

  return (
    <div className={`pdp-container ${isLoaded ? "fade-in" : ""}`}>
      {isLoaded && (
        <>
          <ProductDetails product={product} user={user} sessionId={sessionId} setProduct={setProduct} />
          <ProductCarousel product={product} />
        </>
      )}
    </div>
  );
};

export default ProductDisplayPage;
