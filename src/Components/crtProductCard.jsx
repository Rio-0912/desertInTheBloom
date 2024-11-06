import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cartproductcard = ({ data }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(data?.quantity < data?.maxQuantity ? data?.quantity : data?.maxQuantity || 1);
  const currency = 'INR';
  const sellingPrice = data?.product?.selling_price || 0;

  if (!data) {
    console.error("Data prop is undefined.");
    return null;
  }

  const removeProduct = async (item) => {
    const pid = item?.product?._id;
    try {
      const response = await postRequest(true, `/cart/${pid}`, item);
      if (response.status) {
        toast.success("Product removed successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  // Quantity handler
  const handleQuantityChange = (action) => {
    if (action === 'increase' && quantity < data?.maxQuantity) {
      setQuantity(prevQuantity => prevQuantity + 1);
      editCart(data?.product?._id, quantity + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
      editCart(data?.product?._id, quantity - 1);
    } else if (quantity === data?.maxQuantity && action === 'increase') {
      toast.error("Max stock reached");
    }
  };

  const editCart = async (pid, quantity) => {
    try {
      const response = await putRequest(true, `/cart/${pid}`, { quantity });
      if (response.status) {
        toast.success("Updated");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <div className="grid my-2 h-fit w-auto grid-cols-[130px,1fr] gap-x-3 p-2 border-b rounded-lg">
      <div onClick={() => navigate(`/product/${data?.product?._id}`)} className="rounded-lg w-full cursor-pointer">
        <img
          src={data?.image?.[0] || "/image.png"}
          className="rounded-md w-full h-[190px]"
          alt="product image"
        />
      </div>
      <div className="p-2 gap-1">
        <p className="text-sm">{data?.product?.title || "No title available"}</p>
        <p className="text-sm font-semibold my-2">
          {currency} {sellingPrice} 
        </p>

        <div className="text-sm mt-2">
          <p>
            <span className="font-semibold">Size:</span> {data?.size?.label || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Color:</span> {data?.color?.label || "N/A"}
          </p>
          <div className="flex items-center gap-3 my-2">
            <button
              onClick={() => handleQuantityChange('decrease')}
              className="px-2 py-1 border rounded-md text-lg font-semibold"
              disabled={quantity === 1}
            >
              −
            </button>
            <p className="px-4 text-lg">{quantity}</p>
            <button
              onClick={() => handleQuantityChange('increase')}
              className="px-2 py-1 border rounded-md text-lg font-semibold"
            >
              +
            </button>
          </div>
          <p>
            <span className="font-semibold">Total Price :</span> {sellingPrice * quantity || "N/A"}
          </p>
        </div>

        <div className="flex w-full flex-col md:flex-row gap-2 items-center justify-end">
          <section className="flex">
            <p
              onClick={() => removeProduct(data)}
              className="flex justify-center gap-1 items-center cursor-pointer text-[#5072A7]"
            >
              <span className="font-semibold">Remove</span> 
              <span>
                <IoMdRemoveCircleOutline size={20} />
              </span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cartproductcard;
