import React, { useState } from "react";

const Fav = () => {
  const [favorites] = useState([
    {
      _id: "1",
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT78FM3Zh5FfYTp9vzz4gdGMI623XpOwDc-z5fiwq2gJX1Mj4xEaebsSSs65PmUV6wmHLE_OQkA_dEWgZiy8JlpNZ55odtDBxriTi9wilc",
      title: "Product 1",
      price: 1500,
    },
    {
      _id: "2",
      image: "https://thekurtacompany.com/cdn/shop/products/navy-blue-printed-kurta-614052.jpg?v=1691134373&width=320",
      title: "Product 2",
      price: 2500,
    },
    {
      _id: "3",
      image: "https://thekurtacompany.com/cdn/shop/products/navy-blue-printed-kurta-614052.jpg?v=1691134373&width=320",
      title: "Product 3",
      price: 1000,
    },
  ]);

  const handleProductClick = (productId) => {
    // Instead of using `useNavigate`, you can implement your own logic to navigate to the product page
    console.log(`Navigating to product page for product ID: ${productId}`);
  };

  return (
    <div className="h-full overflow-y-auto px-2 py-3 md:py-0 md:px-0">
      <p className="font-semibold text-xl">Your Favorites</p>
      <div>
        {favorites.length === 0 ? (
          <h1>You haven't added any favorites yet 😢</h1>
        ) : (
          <div className="my-2 grid grid-cols-1 gap-4 pb-8 p-2 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => handleProductClick(item._id)}
              >
                <div className="p-4 ">
                  <img
                    src={item.image}
                    className="max-h-[65vh] w-full h-fit rounded-lg object-cover mb-4"
                    alt={item.title}
                  />
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gold_dark font-medium text-lg">
                    {new Intl.NumberFormat().format(item.price)} INR
                  </p>
                </div>
                <div className="bg-gray-100 px-4 py-3 rounded-b-lg flex justify-end items-center">
                  <button
                    className="text-gray-500"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the product click event from firing
                      // Implement your own logic to handle the "View Product" action
                      console.log(`Viewing product with ID: ${item._id}`);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Fav;