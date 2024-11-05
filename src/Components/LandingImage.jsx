import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import banner1 from "../assets/banner.jpeg";


const LandingPage = () => {
  const images = [banner1];

  return (
    <div className="px-3 md:px-14 py-3 ">
      <Carousel
        autoPlay
        infiniteLoop={true}   
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        {images.map((img, index) => (
          <div key={index} >
            <img
              className="h-[40vh] md:h-[80vh] w-[50%] rounded-3xl object-cover"
              src={img}
              alt={`Legend ${index + 1}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default LandingPage;
