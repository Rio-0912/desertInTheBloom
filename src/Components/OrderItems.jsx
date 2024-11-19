import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';


const OrderItems = ({ }) => {
    const [orderDetails, setOrderDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    const { orderId } = useParams();
    const fetchOrderDetails = async () => {
        try {
            console.log(`http://localhost:8081/api/orders/det/${orderId}`);
            const response = await axios.get(`http://localhost:8081/api/orders/det/${orderId}`);

            setOrderDetails(response.data.orderDetails);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching order details:', error);
            toast.error('Failed to fetch order details');
            setLoading(false);
        }
    };
    useEffect(() => {


        fetchOrderDetails();

    }, [orderId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
            </div>
        );
    }

    if (!orderDetails || orderDetails.length === 0) {
        return <div className="text-center text-gray-500">No order details found</div>;
    }

    // Calculate total order value
    const totalOrderValue = orderDetails.reduce((total, item) =>
        total + (item.p_price * item.quantity), 0);

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Order #{orderDetails[0].order_id}</h2>
                <div className="text-sm text-gray-600">
                    Ordered {formatDistanceToNow(new Date(orderDetails[0].order_date), { addSuffix: true })}
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div>
                    <h3 className="font-semibold text-gray-700">Order Status</h3>
                    <p className={`
                        font-bold uppercase 
                        ${orderDetails[0].order_status === 'delivered' ? 'text-green-600' :
                            orderDetails[0].order_status === 'pending' ? 'text-yellow-600' :
                                'text-blue-600'}
                    `}>
                        {orderDetails[0].order_status}
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-700">Total Amount</h3>
                    <p className="text-xl font-bold text-gray-900">
                        ₹{new Intl.NumberFormat('en-IN').format(totalOrderValue)}
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-700">Total Items</h3>
                    <p className="text-gray-800">
                        {orderDetails.length} Product{orderDetails.length > 1 ? 's' : ''}
                    </p>
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Order Items</h3>
                {orderDetails.map((item) => (
                    <div
                        key={item.product_id}
                        className="flex items-center border-b last:border-b-0 py-3"
                    >
                        <img
                            src={item.img}
                            alt={item.pname}
                            className="w-20 h-20 object-cover rounded-md mr-4"
                        />
                        <div className="flex-grow">
                            <h4 className="font-semibold text-gray-800">{item.pname}</h4>
                            <p className="text-gray-600">
                                {item.p_desc}
                            </p>
                            <p className="text-gray-600 mt-1">
                                Quantity: {item.quantity} |
                                Price: ₹{new Intl.NumberFormat('en-IN').format(item.p_price)}
                            </p>
                        </div>
                        <div className="font-bold text-gray-900">
                            ₹{new Intl.NumberFormat('en-IN').format(item.p_price * item.quantity)}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h3>
                <div className="flex justify-between">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="font-bold">₹{new Intl.NumberFormat('en-IN').format(totalOrderValue)}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span className="text-gray-700">Total Items</span>
                    <span className="font-bold">{orderDetails.length}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderItems;