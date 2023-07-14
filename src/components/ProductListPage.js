import React, { useEffect, useState } from "react";
import { ProductListItem } from '../components'
import { fetchAllProducts } from "../axios-services";

const ProductListPage = (props) => {
    const { user, sessionId } = props;

    const [products, setProducts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await fetchAllProducts();
                setProducts(productsData)
                setIsLoaded(true);
            } catch (error) {
                console.error(error)
            }
        }

        fetchData();
    }, [])

    return (
        <div className={`plp-container ${isLoaded ? "fade-in" : ""}`}>
            {products.map((product) => {
                return <ProductListItem key={product.id} product={product} user={user} sessionId={sessionId} setProducts={setProducts} />
            })}
        </div>
    )
}

export default ProductListPage;
