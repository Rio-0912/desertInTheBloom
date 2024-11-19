import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewCard = ({ review }) => {
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <span
                key={index}
                className={`text-xl ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
            >
                ★
            </span>
        ));
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                        {/* Convert cust_id to string to safely call charAt() */}
                        {review.cust_id && String(review.cust_id).charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-gray-700">
                         {review.cust_name}
                    </span>
                </div>
                <div className="flex">
                    {renderStars(review.ratings)}
                </div>
            </div>
            <p className="text-gray-600 italic">
                {review.comment}
            </p>
        </div>
    );
};

const ReviewDisplay = ({ productId }) => {
    const [reviews, setReviews] = useState([
        // Default data to match the review structure
        {
            r_id: '1',
            cust_id: 'user123',
            p_id: productId,
            comment: 'Amazing product! Exceeded my expectations.',
            ratings: 5
        },
        {
            r_id: '2',
            cust_id: 'user456',
            p_id: productId,
            comment: 'Good quality, but a bit expensive.',
            ratings: 4
        }
    ]);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/api/reviews/${productId}`);
            
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [productId]);

    return (
        <div className="p-4 bg-gray-50 rounded-lg md:w-[50%] m-auto">
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            {reviews.length === 0 ? (
                <p className="text-gray-500 italic">No reviews yet</p>
            ) : (
                reviews.map(review => (
                    <ReviewCard key={review.r_id} review={review} />
                ))
            )}
        </div>
    );
};

export default ReviewDisplay;
