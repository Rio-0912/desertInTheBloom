import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import SingleProductSkeleton from "../Skeleton/SingleProductSkeleton";
import Nav from "../Components/Nav";
import Footer from "../Components/Fotter";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const SingleProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const currency = 'INR';

    const [productloader, setProductLoader] = useState(true);
    const [product, setProduct] = useState(null);
    const [convertedPrices, setConvertedPrices] = useState({ sellingPrice: 0, originalPrice: 0 });
    const [cartQuantity, setCartQuantity] = useState(0);
    const [isInCart, setIsInCart] = useState(false);

    const userId = localStorage.getItem("userId");  // Assuming user ID is stored in local storage

    // Function to fetch product data based on ID
    const fetchProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:8081/api/products/${id}`);
            const productData = res.data;
            setProduct(productData);
            setConvertedPrices({
                sellingPrice: productData.p_price,
                originalPrice: productData.p_price,
            });
            setProductLoader(false);
        } catch (error) {
            console.error("Error fetching product:", error);
            setProductLoader(false);
        }
    };

    // Check if the product is already in the cart
    const checkCartStatus = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/api/cart/status/${id}`);
            if (response.data.inCart) {
                setCartQuantity(response.data.quantity);
                setIsInCart(true);
            } else {
                setIsInCart(false);
            }
        } catch (error) {
            console.error("Error checking cart status:", error);
        }
    };

    // Add product to cart
    const addToCart = async () => {
        if (!userId) {
            toast.error("Please log in to add items to the cart!");
            return;
        }

        toast.success("Product added to cart!");

        try {
            const response = await axios.post("http://localhost:8081/api/cart", {
                crt_id: userId,
                p_id: id,
            });
            if (response.status === 201) {
                setIsInCart(true);
                setCartQuantity(1); // Set initial quantity to 1 after adding to cart
                toast.success("Product added to cart!");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Failed to add product to cart");
        }
    };

    // Update cart quantity
    const updateCartQuantity = async (newQuantity) => {
        if (newQuantity <= 0) {
            // Remove from cart if quantity is 0 or less
            await deleteFromCart();
        } else {
            try {
                await axios.put("http://localhost:8081/api/cart", {
                    crt_id: userId,
                    p_id: id,
                    quantity: newQuantity,
                });
                setCartQuantity(newQuantity);
                toast.success("Cart updated");
            } catch (error) {
                console.error("Error updating cart:", error);
                toast.error("Failed to update cart");
            }
        }
    };

    // Remove product from cart
    const deleteFromCart = async () => {
        try {
            await axios.delete(`http://localhost:8081/api/cart`, {
                data: { crt_id: userId, p_id: id },
            });
            setIsInCart(false);
            setCartQuantity(0);
            toast.success("Product removed from cart");
        } catch (error) {
            console.error("Error removing product from cart:", error);
            toast.error("Failed to remove product from cart");
        }
    };

    // UseEffect to fetch product and cart status on component load
    useEffect(() => {
        fetchProduct();
        checkCartStatus(); // Check if the product is already in the cart
    }, [id]);

    return (
        <div className="h-[100svh] w-[100svw] overflow-y-auto">
            <Nav />
            <Toaster position="top-right" reverseOrder={false} />
            <div className="w-full">
                {productloader ? (
                    <SingleProductSkeleton />
                ) : (
                    product && (
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="p-4">
                                <div className="grid grid-cols-2 gap-2">
                                    <Zoom>
                                        <img src={product.img} alt={product.pname} className="w-full object-cover" />
                                    </Zoom>
                                </div>
                            </div>
                            <div className="py-4 px-5 md:px-10">
                                <h1 className="text-2xl font-semibold">{product.pname}</h1>
                                <section className="flex gap-2 items-center text-xl font-bold">
                                    <p>{currency} {new Intl.NumberFormat().format(convertedPrices.sellingPrice)}</p>
                                    <p className="line-through text-gray-500">
                                        {currency} {new Intl.NumberFormat().format(convertedPrices.originalPrice)}
                                    </p>
                                    <p className="text-green-600">
                                        {new Intl.NumberFormat().format(convertedPrices.originalPrice - convertedPrices.sellingPrice)} {currency} off
                                    </p>
                                </section>
                                <p className="italic text-sm">Inclusive of all taxes. Shipping calculated at checkout.</p>
                                <section className="p-2 md:mr-10 text-lg transition-all duration-300 ease-in-out">
                                    <p style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", overflowX: "hidden" }}>
                                        {product.p_desc}
                                    </p>
                                </section>
                                <div className="mt-4">
                                    {isInCart ? (
                                        <div className="flex items-center w-fit rounded-lg  bg-[#a38d90] text-white">
                                            <button
                                                className="px-4  py-2 text-xl font-semibold"
                                                onClick={() => updateCartQuantity(cartQuantity - 1)}
                                            >
                                                -
                                            </button>
                                            <span className="px-4 text-xl">{cartQuantity}</span>
                                            <button
                                                className="px-4 py-2 text-xl font-semibold"
                                                onClick={() => updateCartQuantity(cartQuantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            className="px-6 py-2 w-fit rounded-lg  bg-[#a38d90] text-white text-lg font-semibold"
                                            onClick={addToCart}
                                        >
                                            Add to Cart
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SingleProduct;
