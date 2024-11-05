import React from "react";
import { FaInstagram, FaTwitter, FaFacebook, FaEtsy } from "react-icons/fa";
import { BsShop } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import PrivacyPolicy from '../assets/Policy/PrivacyPolicy.pdf';
import TermsofService from '../assets/Policy/TermsofService.pdf';
import ReturnPolicy from '../assets/Policy/ReturnPolicy.pdf';
import ShippingDelivery from '../assets/Policy/ShippingDelivery.pdf';

import expressImg from '../assets/Card/Exp.png'
import masterCardImg from '../assets/Card/mastercard.png'
import visaImg from '../assets/Card/visa.png'
import paypalImg from '../assets/Card/paypal.png'
import upiImg from '../assets/Card/upi.png'

const cardImages = [
  { img: expressImg },
  { img: masterCardImg },
  { img: visaImg },
  { img: paypalImg },
  { img: upiImg },
];

function Footer() {
  const navigate = useNavigate();

  const list = [
    { title: "About Us", link: "/about-us" },
    { title: "Contact Us", link: "/contact-us" },
    { title: "FAQs", link: "/faqs" },
    { title: "Privacy Policy", link: PrivacyPolicy },
    { title: "Terms of Service", link: TermsofService },
    { title: "Return Policy", link: ReturnPolicy },
    { title: "Shipping & Delivery", link: ShippingDelivery },
  ];

  return (
    <div className="bg-[#bda3a7] pt-8 pb-2 mt-7">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap md:justify-evenly  text-lg">
          <div className="w-full md:w-1/5 text-center md:text-left mb-4 md:mb-0">
            <h1 className="font-bold mb-5">Connect With Us</h1>
            <p>Call: +91 98199 53549</p>
            <div className="flex items-center justify-center md:justify-start">
            <span className="">Shop No. 3, Dinar Bldg., <br /> 20 Station Rd,
              Opp. Sompuri Market, Santacruz (W),
              Mumbai - 400 054. IST</span>
            </div>
            <p>Email : care@inayapoeticthreads.com</p>

          </div>

          <div className="w-full md:w-1/5 text-center md:text-left mb-4 md:mb-0">
            <h3 className="font-semibold mb-4">Policy</h3>
            <ul className="cursor-pointer">
              <li><a href={ReturnPolicy} target="_blank" className="hover:underline">Return Policy</a></li>
              <li><a href={TermsofService} target="_blank" className="hover:underline">Terms & Conditions</a></li>
              <li><a href={PrivacyPolicy} target="_blank" className="hover:underline">Privacy Policy</a></li>
              <li><a href={ShippingDelivery} target="_blank" className="hover:underline">Shipping Policy</a></li>
            </ul>
          </div>



          <div className="w-full md:w-1/5 text-center md:text-left mb-4 md:mb-0">
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="cursor-pointer">
              <li onClick={() => navigate('/about')} className="hover:underline">Our Story</li>
              <li onClick={() => navigate('/care')} className="hover:underline">Wholesale Export</li>
              <li onClick={() => navigate('/care')} className="hover:underline">Contact Us</li>
              <li onClick={() => navigate('/returnandrefund')} className="hover:underline">Return And Refund</li>
            </ul>
          </div>
          {/* <div className="w-full md:w-1/5 text-center md:text-left mb-4 md:mb-0">
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="cursor-pointer">
              <li><a href="#" className="hover:underline">Men</a></li>
              <li><a href="#" className="hover:underline">Women</a></li>
              <li><a href="#" className="hover:underline">BestSeller</a></li>
              <li><a href="#" className="hover:underline">About Us</a></li>
            </ul>
          </div> */}

          <div className="w-full md:w-1/5 flex flex-col items-center  ">
            <h2 className="text-lg font-bold text-center">Join Our Newsletter</h2>
            <p className="mt-2 text-center">Sign up to get best deals, first look and more!</p>
            <div className="mt-6 flex  ">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="flex-grow px-2 py-1 rounded-l-lg border focus:outline-none focus:ring-1 focus:ring-gold_medium"
              />
              <button className="p-2 bg-gold_primary text-white rounded-r-lg hover:bg-gold_primary focus:outline-none focus:ring-1 focus:ring-gold_medium">
                Subscribe
              </button>
            </div>
            <div className="flex   space-x-4 pt-5">
              <a href="#" className="text-white">
                <FaFacebook size={30} />
              </a>
              <a href="#" className="text-white ">
                <FaInstagram size={30} />
              </a>
              <a href="#" className="text-white">
                <FaTwitter size={30} />
              </a>
              <a href="https://www.etsy.com/in-en/shop/InayaPoeticThreads" target="_blank" className="text-white">
                <FaEtsy size={30} />
              </a>


            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-1 bg-gold_primary my-3">
        <br />
      </div>
      <div className="  flex justify-center items-center flex-col mt-4">
        <p className="mx-3 text-lg">100% Secure Payments  </p>
        <span className="flex   justify-center ">{cardImages.map((img) => (
          <img key={img.img} src={img.img} alt="Card" className="m-1  md:max-h-[25px] max-h-[18px] max-w-fit" />
        ))}</span>
      </div>
    </div>
  );
}

export default Footer;
