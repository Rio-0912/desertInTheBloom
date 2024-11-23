import React from 'react';
import Nav from '../Components/Nav';
import About from '../assets/aboutus.jpeg';

const AboutUs = () => {
  return (
    <div>
      <Nav />
      <div className='flex items-center justify-center m-auto container flex-wrap sm:flex-nowrap'>
        <div className='m-6 sm:m-14 md:w-1/2'>
          <h1 className='text-4xl font-bold text-gold_dark mb-6'>Our Story</h1>
          <p className='text-2xl leading-relaxed'>
          At Dersert And Bloom,  each thread we weave tells a story—stories of tradition, craftsmanship, and timeless elegance. We source the finest materials from around the world to create garments that are not just clothing but works of art. With years of dedication, we’ve perfected our craft, ensuring that every piece reflects the rich heritage of India. Each garment is carefully crafted to speak for itself, embodying the personalized touch that sets Dersert And Bloom apart. Discover the beauty of tradition with Dersert And Bloom, where every stitch carries a legacy.
           
          </p>
        </div>
        <div className='w- sm:w-[40%] sm:m-4 p-8 pt-0'>
          <img src={About} alt="About Us" className='rounded-lg ' />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
