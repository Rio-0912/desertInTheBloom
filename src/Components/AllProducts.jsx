import React, { useState } from 'react';
import ProductCardSkeleton from '../Skeleton/ProductCardSkeleton';
import ProductCard from './ProductCard';

const AllProducts = () => {
    const [loader, setLoader] = useState(false);
    const [products] = useState([
        // Dummy product data
        { _id: '1', title: 'Sample Product 1', color: [{ sizeAndQuantity: [{ image: ['https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT78FM3Zh5FfYTp9vzz4gdGMI623XpOwDc-z5fiwq2gJX1Mj4xEaebsSSs65PmUV6wmHLE_OQkA_dEWgZiy8JlpNZ55odtDBxriTi9wilc'] }] }], price : 1000 },
        { _id: '2', title: 'Sample Product 2', color: [{ sizeAndQuantity: [{ image: ['https://thekurtacompany.com/cdn/shop/products/navy-blue-printed-kurta-614052.jpg?v=1691134373&width=320'] }] }],price : 1000 },
        // Add more dummy products as needed
    ]);

    return (
        <div className=''>
            <div className="flex flex-col w-full gap-2">
                <div className="text-center py-4">
                    {/* Category Name Placeholder */}
                    <h2 className="text-xl font-medium text-gray-600">All Products</h2>
                </div>

                <div className="">
                    {loader ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-3 md:px-6 md:mb-5">
                            {[...Array(8)].map((_, index) => (
                                <ProductCardSkeleton key={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-3 md:px-6">
                            {products.map((product) => (
                                <ProductCard key={product._id} data={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
