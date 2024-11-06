import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ data }) => {
    const navigate = useNavigate();

    const redirect = () => {
        navigate(`/product/${data?.p_id}`);
    };

    return (
        <div
            className="cursor-pointer transition duration-300 ease-in-out opacity-90 p-2 hover:opacity-100 group"
            onClick={redirect}
        >
            <div className="min-h-[65%] md:min-h-[80%] flex justify-center items-center">
                <img
                    src={data?.img || "/placeholder-image.jpg"}
                    alt={data?.pname || "Product"}
                    className="object-cover w-full h-[75vh] rounded"
                />
            </div>
            <div className="flex flex-col">
                <div className='flex justify-between p-1'>
                    <p className="font-semibold mt-1 text-sm md:text-lg">
                        {data?.pname || 'Sample Product'}
                    </p>
                    <p className="mt-1 text-sm md:text-lg">
                        ₹ {data?.p_price || '0'}
                    </p>
                </div>

                <button className="text-gold_dark bg-[#ad8e92] rounded-md px-4 py-[3px] text-sm my-1 border border-gold_dark hover:bg-gold_dark text-white hover:border-none">
                    Add To Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
