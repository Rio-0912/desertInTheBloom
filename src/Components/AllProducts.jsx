import React, { useState, useEffect } from 'react';
import ProductCardSkeleton from '../Skeleton/ProductCardSkeleton';
import ProductCard from './ProductCard';
import axios from 'axios'

const AllProducts = () => {
    const [loader, setLoader] = useState(false);
    const url = import.meta.env.backedUrl;
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            setLoader(true);
            const res = await axios.get(`http://localhost:8081/api/products`); // Adjusted to get products from the API
            setLoader(false);
            setProducts(res.data); // Update state with fetched data
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoader(false);
        }
    };

    useEffect(() => {
        getProducts()


    }, [])

    return (
        <div className=''>
            <div className="flex flex-col w-full gap-2">
                <div className="text-center py-4">
                    {/* Category Name Placeholder */}
                    <h2 className="text-xl font-medium text-gray-600">All Products</h2>
                </div>

                <div className="m-auto">
                    {loader ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 m-auto gap-2 px-3 md:px-6 md:mb-5">
                            {[...Array(8)].map((_, index) => (
                                <ProductCardSkeleton key={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 m-auto  md:grid-cols-2 lg:grid-cols-3     gap-4 px-3 md:px-6">
                            {products?.map((product) => (
                                <ProductCard key={product.p_id} data={product} />  // Make sure you're passing a single product here
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
