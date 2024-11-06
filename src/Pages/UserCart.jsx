import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cartproductcard from "../Components/crtProductCard";
import CartCardSkeleton from "../Skeleton/CartCardSkeleton";
import axios from 'axios';
import { useUser } from '@clerk/clerk-react'
import Nav from "../Components/Nav";

const UserCart = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [cart, setCart] = useState([

    {
      "product": {
        "_id": "66db270b8638846fde9069d5",
        "title": "Pure mul chanderi gharara set",
        "description": "Pure Cotton Silk Gharara set with vintage chikankari stitch in festive colors.\nLength of kurta - 33 to 35\nCan be customized to your measurements. Please request for customization before placing your order.\nbucket wash. line dry and light iron for best results.",
        "original_price": "19045",
        "selling_price": "18500",
        "category": [
          "66db26660f81720dc2db820f",
          "66584c3c7dc800186e0ed19d",
          "665848587dc800186e0ed16f"
        ],
        "material": "Cotton",
        "howToWash": "Slowly",
        "delivery": [
          "66db270c8638846fde9069db"
        ],
        "createdAt": "2024-09-06T16:00:11.903Z",
        "__v": 5,
        "color": [
          "671e66634bd54c6f2ecce50e"
        ],
        "measurement": "Model is wearing S"
      },
      "quantity": 1,
      "maxQuantity": 3,
      "size": {
        "value": "XXL",
        "label": "XXL"
      },
      "color": {
        "value": "#F5FD03",
        "label": "Yellow"
      },
      "image": [
        "https://res.cloudinary.com/dgokxkckw/image/upload/v1730045534/categories_loackwani/szi5u2d46swu3fvrl29q.webp",
        "https://res.cloudinary.com/dgokxkckw/image/upload/v1730045535/categories_loackwani/aevq4zgnbeahhbe86fup.webp",
        "https://res.cloudinary.com/dgokxkckw/image/upload/v1730045536/categories_loackwani/pvm8nauvat9tdkwucirn.webp",
        "https://res.cloudinary.com/dgokxkckw/image/upload/v1730045537/categories_loackwani/yiq8aaeriboibtpnm9ek.webp"
      ],
      "_id": "672bc573ab2ee1d7f67ece31"
    },
    {
      "product": {
        "_id": "66c3a5224ebedc3ac9c78a51",
        "title": "Latifa Silk Kurta with Mukaish",
        "description": "About this item\nThe Latifa Kurta in Navy Blue and Olive Green will delight you with its mesmerizing embroidery and clean lines throughout.\n\nEmbroidered in chikankari with Vintage Floral motifs.\n\nEasy Neckline with herringbone stitches, shoulder yoke with vertical pleats to the hem.\n\nSide slits and Full sleeves.\n\nLength - 48 inches\n\nEmbellished with gorgeous Mukaish detailing throughout highlighting the ring mukaish.\n\nSizes -\n\nS - fits bust size 34\nM - fits bust size 36\nL - fits bust size 38\nXL - fits bust size 40\n0X - fits bust size 42\n1X - fits bust size 44",
        "original_price": "1784",
        "selling_price": "1654",
        "category": [
          "665848967dc800186e0ed181",
          "665848587dc800186e0ed16f",
          "665848357dc800186e0ed167",
          "66584c1c7dc800186e0ed195"
        ],
        "material": "Cotton",
        "howToWash": "Fast",
        "delivery": [
          "66c3a5234ebedc3ac9c78a5a"
        ],
        "createdAt": "2024-08-19T20:03:46.481Z",
        "__v": 6,
        "color": [
          "671e66957f6b4f3069753f6d"
        ],
        "measurement": "Model is wearing L"
      },
      "quantity": 1,
      "maxQuantity": 2,
      "size": {
        "value": "M",
        "label": "M"
      },
      "color": {
        "value": "#2A54AF",
        "label": "Navy Blue"
      },
      "image": [
        "https://res.cloudinary.com/dgokxkckw/image/upload/v1730045584/categories_loackwani/wi8xkc9kbcmwpxdeq0a2.webp",
        "https://res.cloudinary.com/dgokxkckw/image/upload/v1730045585/categories_loackwani/qgjbtd0fsrqohbxhaupr.webp",
        "https://res.cloudinary.com/dgokxkckw/image/upload/v1730045586/categories_loackwani/w1vch1jgpiubdsgkagfr.webp",
        "https://res.cloudinary.com/dgokxkckw/image/upload/v1730045587/categories_loackwani/trseae4hapmuled1hh0a.webp"
      ],
      "_id": "672bc57d3c0cf763d9ca4b3e"
    }

  ]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartLoader, setCartLoader] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [discountState, setDiscountState] = useState(false);
  const [shippingCharge, setShippingCharge] = useState(0);

  const calculateTotalPrice = () => {
    let subtotal = 0;

    for (const item of cart) {
      subtotal += item?.product?.selling_price * item.quantity;
    }

    let shipping = 0;
    if (subtotal < 1500) {
      shipping = 50;
    }

    const finalTotal = subtotal + shipping - discount;
    setTotalPrice(finalTotal.toFixed(2));
    setShippingCharge(shipping);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cart, discount, discountState]);

  const getUserCart = async () => {
    try {
      setCartLoader(true);
      const response = await getRequest(true, `/cart`);
      setCart(response.cart);
      setCartLoader(false);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      toast.error("Failed to load cart data.");
    }
  };

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value.toUpperCase());
  };

  const handleCoupon = async () => {
    try {
      const res = await axios.post(
        `${backend}/coupons/check/${couponCode}`,
        {
          purchaseAmount: totalPrice,
          phoneNumber: userDetails.mobileNo,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.status === true) {
        setDiscount(res.data.discountAmount);
        setDiscountState(true);
        toast.success("Coupon applied successfully!");
      } else {
        setDiscount(0);
        setDiscountState(false);
        toast.error(res.data.message || "Invalid coupon code");
      }
    } catch (error) {
      setCouponCode('');
      console.log(error);
      toast.error(error.response.data.message || "Invalid coupon code");
    }
  };

  const checkout = async (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      toast.error("Cart is empty, nothing to buy.");
      return;
    }

    if (!userDetails?.address) {
      toast.error("Set your address in profile to place order.");
      return;
    }

    try {
      const txnid = `txn_${Date.now()}`;
      const formData = {
        key: key,
        txnid: txnid,
        amount: totalPrice,
        productinfo: "Product Information",
        firstname: userDetails?.name,
        email: userDetails?.email,
        phone: userDetails?.mobileNo,
        surl: `${backend}/pay/payu_success`,
        furl: `${backend}/pay/payu_failure`,
      };

      const hashString = `${formData.key}|${formData.txnid}|${formData.amount}|${formData.productinfo}|${formData.firstname}|${formData.email}|||||||||||${salt}`;
      const hash = crypto.SHA512(hashString).toString(crypto.enc.Hex);
      formData.hash = hash;

      const form = document.getElementById("payuForm");
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = formData[key];
          form.appendChild(input);
        }
      }
      form.submit();

      try {
        if ((!(couponCode == "")) && discountState == true) {
          const res = await axios.put(
            `${backend}/auth/updateUserCoupon`,
            {
              couponCode: couponCode,
              discount_Got: discount,
            },
            {
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              },
            }
          );
        }
      } catch (error) {
        console.error("Error during checkout:", error);
        toast.error("Something went wrong during checkout. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Something went wrong during checkout. Please try again.");
    }
  };

  return (
    <div>
      <Nav />
      <div className="md:px-8">
        <form
          id="payuForm"
          action="https://test.payu.in/_payment"
          method="post"
          onSubmit={checkout}
        >
          <input type="submit" value="Submit" className="hidden" />
        </form>

        <div className="flex flex-col border-r-2 gap-3 md:flex-row ">
          <div className=" w-full md:w-2/3 rounded-md md:h-[75vh] bg-gray-50 p-3 overflow-y-auto">
            {cartLoader ? (
              <>
                <CartCardSkeleton />
                <CartCardSkeleton />
                <CartCardSkeleton />
              </>
            ) : cart?.length == 0 ? (
              <h1>Cart is Empty</h1>
            ) : (
              cart?.map((item, index) => (
                <Cartproductcard key={index} data={item} />
              ))
            )}
          </div>
          <div className="w-full md:w-1/3 rounded-md bg-gray-50 p-4  ">
            <p className="font-semibold my-2 pb-2 border-b-2 border-dashed">
              Total Bill
            </p>

            <div className="flex flex-col gap-y-2 pb-2 border-b-2 border-dashed">
              <section className="flex border-b-2 border-dashed justify-between">
                <p>Subtotal</p>
                <p>{totalPrice - discount - shippingCharge}</p>
              </section>
              {discountState && (
                <section className="flex border-b-2 border-dashed justify-between">
                  <p>Coupon Discount</p>
                  <p>{discount}</p>
                </section>
              )}
              <section className="flex border-b-2 border-dashed justify-between">
                <p>Shipping Charge</p>
                <p>{shippingCharge}</p>
              </section>
              <section className="flex my-2 justify-between">
                <p className="text-lg">Total</p>
                <p>{totalPrice}</p>
              </section>

            </div>

            <div className="py-2">
              <section className="flex justify-between">
                <p className=" font-semibold py-1">Address</p>
                <p
                  onClick={() => navigate("/profile")}
                  className=" font-semibold py-1 cursor-pointer text-blue-600"
                >
                  Change
                </p>
              </section>
              <section className="p-2 w-full border-2 rounded-md">
                Santacruz India this si adderss
              </section>
            </div>
            <div>
              <button
                onClick={checkout}
                className="bg-[#bda3a7] w-full text-white px-3 py-3 font-semibold rounded-lg"
              >
                Proceed to checkout
              </button>
              <button
                onClick={() => navigate("/products")}
                className=" mt-2 w-full border px-3 py-3 font-semibold rounded-lg"
              >
                Continue shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default UserCart;