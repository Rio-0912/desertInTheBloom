import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuChevronRight } from "react-icons/lu";
import moment from "moment/moment";
import MyorderCardSkeleton from "../Skeleton/MyorderCardSkeleton";

const AllOrders = () => {
  const navigate = useNavigate();
  const [orders] = useState([
    {
      _id: "1",
      status: "Delivered",
      orderDateTime: new Date(),
      orderValue: 1500,
      items: [{ image: ["https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT78FM3Zh5FfYTp9vzz4gdGMI623XpOwDc-z5fiwq2gJX1Mj4xEaebsSSs65PmUV6wmHLE_OQkA_dEWgZiy8JlpNZ55odtDBxriTi9wilc"], title: "Product 1", }],
    },
    {
      _id: "2",
      status: "Pending",
      orderDateTime: new Date(),
      orderValue: 2500,
      items: [{ image: ["https://thekurtacompany.com/cdn/shop/products/navy-blue-printed-kurta-614052.jpg?v=1691134373&width=320"], title: "Product 2" }],
    },
    {
      _id: "3",
      status: "Cancelled",
      orderDateTime: new Date(),
      orderValue: 1000,
      items: [{ image: ["https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT78FM3Zh5FfYTp9vzz4gdGMI623XpOwDc-z5fiwq2gJX1Mj4xEaebsSSs65PmUV6wmHLE_OQkA_dEWgZiy8JlpNZ55odtDBxriTi9wilc"], title: "Product 3" }],
    },
  ]);

  return (
    <div className="h-full overflow-y-auto px-2 py-3 md:py-0 md:px-0">
      <p className="font-semibold text-xl">Your orders</p>
      <div>
        {orders.length === 0 ? (
          <h1>Having No Orders Looks bad 😒</h1>
        ) : (
          <div className="my-2 grid grid-cols-1 gap-4 pb-8 p-2 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => navigate(`/profile/myorder/${item._id}`)}
              >
                <div className="p-4">
                  <section className="flex items-center justify-between mb-3">
                    <p className={`rounded-full px-4 font-medium py-1 ${
                      item.status === "Delivered"
                        ? "bg-green-100 text-green-500"
                        : item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-500"
                        : "bg-red-100 text-red-500"
                    }`}>
                      {item.status}
                    </p>
                    <p className="text-xs font-medium text-gray-500">
                      {moment(item.orderDateTime).format("D MMMM YYYY")}
                    </p>
                  </section>

                  <section className="flex items-center gap-4">
                    <img
                      src={item.items[0].image[0]}
                      className="w-30 h-40 rounded-lg object-cover"
                      alt={item.items[0].title}
                    />
                    <div>
                      <p className="font-semibold text-sm text-gold_dark">Order ID: {item._id}</p>
                      <p className="text-sm font-medium">Total Price: {new Intl.NumberFormat().format(item.orderValue)} INR</p>
                    </div>
                  </section>
                </div>
                <div className="bg-gray-100 px-4 py-3 rounded-b-lg flex justify-end items-center">
                  <LuChevronRight size={20} className="text-gray-500" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;