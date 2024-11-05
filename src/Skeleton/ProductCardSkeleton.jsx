import React from 'react'

function ProductCardSkeleton() {
    return (
        <div>
            <div className="cursor-pointer h-full transition duration-300 ease-in-out opacity-90 p-2 rounded-lg group">
                <div className="flex justify-center items-center relative">
                    <div className="bg-gray-300 animate-pulse object-fill w-full aspect-square rounded-lg"></div>
                    <section className="bg-gray-300 animate-pulse rounded-full p-2 absolute top-4 right-5 md:right-2 md:top-2 hidden group-hover:block"></section>
                </div>
                <div className="mt-2">
                    <div className="bg-gray-300 animate-pulse h-4 w-3/4 rounded"></div>
                    <section className="flex my-1 justify-between items-center">
                        <div className="bg-gray-300 animate-pulse h-4 w-1/4 rounded"></div>
                        <div className="bg-gray-300 animate-pulse h-4 w-1/4 rounded"></div>
                    </section>
                    <div className="bg-gray-300 animate-pulse h-6 w-1/4 rounded mt-2"></div>
                </div>
            </div>
        </div>
    )
}

export default ProductCardSkeleton