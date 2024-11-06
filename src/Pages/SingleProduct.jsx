import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import SingleProductSkeleton from "../Skeleton/SingleProductSkeleton";
import Nav from "../Components/Nav";
import { IoIosArrowDown } from "react-icons/io";
import { TbRulerMeasure, TbTruckDelivery } from "react-icons/tb";
import { GiRolledCloth } from "react-icons/gi";
import Footer from "../Components/Fotter";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { IoStar } from "react-icons/io5";


const SingleProduct = () => {
    const { id } = useParams();
    const url = import.meta.env.VITE_BACKEND;
    const navigate = useNavigate();

    const [productloader, setproductloader] = useState(false);
    const [similarLoader, setsimilarLoader] = useState(false);
    const [sizeNeeded, setSizesNeeded] = useState([]);
    const [product, setProduct] = useState({
        "_id": "66bdac5a90f4d55c71794384",
        "title": "Cotton Rosa Dress",
        "description": "About this item\nEnchanting Navy Blue, in this ruffle neck style Dress with an embroidered Yoke, kali panels, and 3/4 ruffle sleeves is embroidered beautifully in contemporary motifs.\n\nPure cotton. Prewashed. Preshrunk. Colorfast.\n\nLength - 47-48 inches\n\nAvailable in sizes :\n\nS - for bust 34\nM - for bust 36\nL - for bust 38\nXL - for bust 40\n0X - for bust 42\n1X - for bust 44",
        "original_price": "2700\n",
        "selling_price": "2500",
        "image":
            "https://res.cloudinary.com/dgokxkckw/image/upload/v1730045466/categories_loackwani/wydtjhpkmh8teythotbd.webp",

        "category": [
            {
                "_id": "665848587dc800186e0ed16f",
                "name": "Dresses",
                "image": "https://res.cloudinary.com/dgokxkckw/image/upload/v1723056565/categories_loackwani/qfvrcrj4aahcnuhdz3ao.webp",
                "createdAt": "2024-05-30T09:35:20.182Z",
                "__v": 0
            },
            {
                "_id": "66db26660f81720dc2db820f",
                "name": "Timeless Wear",
                "image": "https://res.cloudinary.com/dgokxkckw/image/upload/v1725638245/categories_loackwani/jga2rxcppvr6ahxquw1h.webp",
                "createdAt": "2024-09-06T15:57:26.544Z",
                "__v": 0
            },
            {
                "_id": "66584c3c7dc800186e0ed19d",
                "name": "DUPATTAS & STOLES",
                "image": "https://res.cloudinary.com/dgokxkckw/image/upload/v1723055995/categories_loackwani/m3g3ho6az8mub5yhcmwv.webp",
                "createdAt": "2024-05-30T09:51:56.075Z",
                "__v": 0
            }
        ],
        "material": "Cotton",
        "howToWash": "Machine Wash",

        "createdAt": "2024-08-15T07:20:58.487Z",
        "__v": 7,

        "measurement": "l.hnhnn;"

    });
    const [colors, setcolors] = useState([]);
    const [color, setcolor] = useState("");
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setquantity] = useState(1);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [detailsOptions, setdetailsOptions] = useState("");
    const [reviewData, setreviewData] = useState([]);
    const [convertedPrices, setConvertedPrices] = useState({ sellingPrice: product.selling_price, originalPrice: product.original_price });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const currency = "INR";
    const add = () => {
        if (quantity < color?.quantity) setquantity(prev => prev + 1);
        else toast.error(`Only ${color?.quantity} quantity available.`);
    };

    const remove = () => setquantity(prev => Math.max(0, prev - 1));

    const addToFavorite = async () => {
        try {
            const res = await postRequest(true, `/liked`, { productId: id });
            if (res.status) {
                setfavourites(prev => [...prev, id]);
                toast.success(res.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Error adding to favorites");
        }
    };

    const removeFromFavorite = async () => {
        try {
            const res = await postRequest(true, `/liked/remove`, { productId: id });
            if (res.status) {
                setfavourites(prev => prev.filter(favId => favId !== id));
                toast.success(res.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Error removing from favorites");
        }
    };



    const fetchProduct = async () => {
        try {
            setproductloader(true);
            const { data } = await axios.get(`${url}/admin/product/${id}`);
            setProduct(data.products);
            setcolors(data.products.color);
            setcolor(data.products.color[0]);
            setproductloader(false);
        } catch (error) {
            console.error("Error fetching product:", error);
            setproductloader(false);
        }
    };

    useEffect(() => {
        if (color?.sizeAndQuantity?.length > 0) setSelectedSize(color.sizeAndQuantity[0]);
        else setSelectedSize(null);
        setquantity(1);
    }, [color]);



    const handleAddToCart = async (sign) => {
        if (!1) {
            toast.error("Login to add to cart.");
            return;
        }
        try {
            const response = await postRequest(true, "/cart", {
                productId: id,
                quantity,
                color: color ? color.color : product?.color[0].color,
                size: selectedSize?.size,
                image: selectedSize?.image,
                maxQuantity: selectedSize?.quantity,
            });
            if (response.status) {
                if (sign === "is_buy") navigate("/cart");
                else toast.success(response.message);
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };
    console.log(product.image);


    const Modal = ({ isOpen, onClose }) => {
        if (!isOpen) return null;
        return (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
                <button className="btn absolute top-2 right-2 text-4xl" onClick={onClose}>
                    &times;
                </button>

            </div>
        );
    };

    return (
        <div className="h-[100svh] w-[100svw] overflow-y-auto">
            <Nav />
            <div className="w-full">
                {productloader ? (
                    <SingleProductSkeleton />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-4">
                            <div className="grid grid-cols-2 gap-2">
                                <Zoom >
                                    <img src={product.image} alt="Product" className="w-full object-cover" />
                                </Zoom>

                            </div>
                        </div>
                        <div className="py-4 px-5 md:px-10">
                            <h1 className="text-2xl font-semibold">{product?.title}</h1>
                            <section className="flex gap-2 items-center text-xl font-bold">
                                <p>{currency} {new Intl.NumberFormat().format(convertedPrices.sellingPrice)}</p>
                                <p className="line-through text-gray-500">{currency} {new Intl.NumberFormat().format(convertedPrices.originalPrice)}</p>
                                <p className="text-green-600">{new Intl.NumberFormat().format(convertedPrices.originalPrice - convertedPrices.sellingPrice)} {currency} off</p>
                            </section>
                            <p className="italic text-sm">Inclusive of all taxes. Shipping calculated at checkout.</p>
                            <section
                                className={` p-2 md:mr-10 text-lg transition-all duration-300 ease-in-out`}
                            >
                                <p style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", overflowX: "hidden" }}>{product?.description}</p>
                            </section>
                        </div>
                        <div>
                           
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SingleProduct;
