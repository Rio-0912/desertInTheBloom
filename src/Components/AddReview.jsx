import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ReviewSection = ({ productId }) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        // Get user ID from localStorage
        const cust_id = localStorage.getItem('userId');

        if (!cust_id) {
            toast.error('Please log in to submit a review');
            return;
        }

        // Validate inputs
        if (!comment.trim()) {
            toast.error('Please provide a review comment');
            return;
        }

        if (rating === 0) {
            toast.error('Please select a rating');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8081/api/reviews/', {
                cust_id,
                p_id: productId,
                comment,
                ratings: rating
            });

            if (response.status === 201) {
                toast.success('Review submitted successfully');
                // Reset form
                setComment('');
                setRating(0);
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Failed to submit review');
        }
    };

    return (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Submit a Review</h2>
            <form onSubmit={handleSubmitReview}>
                <div className="mb-4">
                    <label className="block mb-2">Rating</label>
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className={`text-2xl mr-1 ${
                                    rating >= star ? 'text-yellow-500' : 'text-gray-300'
                                }`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Review</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-2 border rounded"
                        rows="4"
                        placeholder="Write your review here..."
                    />
                </div>
                <button
                    type="submit"
                    className="px-6 py-2 bg-[#a38d90] text-white rounded-lg"
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default ReviewSection;