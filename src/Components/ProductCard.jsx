import React from 'react';
import { ShoppingCart } from 'lucide-react';
import {useNavigate} from 'react-router-dom'

const ProductCard = ({ data, onProductClick, onAddToCart }) => {
    const navigate =  useNavigate();
    return (
        <div className="w-full max-w-sm rounded-lg border shadow-sm transition-all duration-300 hover:shadow-lg">
            {/* Product Image */}
            <div
                className="relative w-full h-[65vh] overflow-hidden rounded-t-lg cursor-pointer"
                onClick={() => onProductClick?.(data?.p_id)}
            >
                <img
                    src={data?.img || "/api/placeholder/400/320"}
                    alt={data?.pname || "Product image"}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
            </div>

            <div className="p-4">
                {/* Header */}
                <div className="space-y-1 mb-4">
                    <h3 className="text-xl font-semibold truncate">
                        {data?.pname || 'Sample Product'}
                    </h3>
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-[#906c74]">
                            ₹{data?.p_price || '0'}
                        </span>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {data?.description || 'Product description goes here...'}
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 w-full">
                    <button
                        className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#bda3a7]"
                        onClick={() => navigate(`/product/${data?.p_id}`)}
                    >
                        View Details
                    </button>
                    <button
                        className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#bda3a7] rounded-md hover:bg-[#867275] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#bda3a7]"
                        onClick={() => navigate(`/product/${data?.p_id}`)}
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;