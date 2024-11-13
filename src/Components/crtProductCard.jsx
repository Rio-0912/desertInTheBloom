import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Cartproductcard = ({ data, sendDataOfEachCrtItemBackToParent }) => {
  const navigate = useNavigate();
  // const [quantity, setQuantity] = useState(data?.quantity < data?.maxQuantity ? data?.quantity : data?.maxQuantity || 1);
  const currency = 'INR';
  var sellingPrice = data?.product?.selling_price || 0;
  const [crtPro, setCrtPro] = useState()
  sellingPrice = crtPro?.p_price;
  const quantity = data?.quantity || 1;
  // console.log(data);


  if (!data) {
    console.error("Data prop is undefined.");
    return null;
  }



  // Quantity handler


  const getCrtProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8081/api/products/${data.p_id}`);
      sendDataOfEachCrtItemBackToParent(res.data)

      if (res.status === 200) {
        setCrtPro(res.data);
      }
    } catch (error) {
      console.error("Error fetching cart product:", error);
    }
  };
  useEffect(() => {
    getCrtProduct()


  }, [])



  return (
    <div className="grid my-2 h-fit w-auto grid-cols-[130px,1fr] gap-x-3 p-2 border-b rounded-lg">
      <div onClick={() => navigate(`/product/${data?.product?._id}`)} className="rounded-lg w-full cursor-pointer">
        <img
          src={crtPro?.img || "/image.png"}
          className="rounded-md w-full h-[190px]"
          alt="product image"
        />
      </div>
      <div className="p- gap-1">
        <p className="text-lg">{crtPro?.pname || "No title available"}</p>
        <p className="text-sm font-semibold my-2">
          {currency} {sellingPrice}
        </p>

        <div className="text-sm mt-2">

          <div className="flex items-center gap-3 my-2">

            <p className=" text-lg"> Quantity {quantity}</p>

          </div>
          <p>
            <span className="font-semibold">Total Price :</span> {sellingPrice * quantity || "N/A"}
          </p>
        </div>


      </div>
    </div>
  );
};

export default Cartproductcard;
