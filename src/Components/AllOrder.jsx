import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuChevronRight } from "react-icons/lu";
import moment from "moment/moment";
import axios from "axios";
import MyorderCardSkeleton from "../Skeleton/MyorderCardSkeleton";

const AllOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/orders/${localStorage.getItem("userId")}`);
      setOrders(response.data.orders);

    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  useEffect(() => {
    fetchOrders();


  }, [])


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
                onClick={() => navigate(`/profile/myorder/${item.order_id}`)}
              >

                <div className="p-4">
                  <section className="flex items-center justify-between mb-3">
                    <p className={`rounded-full px-4 font-medium py-1 ${item.order_status === "delivered"
                      ? "bg-green-100 text-green-500"
                      : item.order_status === "pending"
                        ? "bg-yellow-100 text-yellow-500"
                        : "bg-red-100 text-red-500"
                      }`}>
                      {item.order_status}
                    </p>
                    <p className="text-xs font-medium text-gray-500">
                      {moment(item.order_date).format("D MMMM YYYY")}
                    </p>
                  </section>

                  <section className="flex items-center gap-4">

                    <div>
                      <p className="font-semibold text-sm text-gold_dark">Order ID: {item.order_id}</p>
                      <p className="text-sm font-medium">Total Price: {new Intl.NumberFormat().format(item.order_total)} INR</p>
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