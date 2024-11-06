import React from 'react'

function SingleProductSkeleton() {
    return (
        <div className=' grid grid-cols-1 md:grid-cols-2 w-[100svw]'>
            <div className=' '>
                <div className="rounded-md p-4 flex justify-center w-full grid-cols-2 animate-pulse">
                    <div className="bg-gray-300 h-[450px] w-[450px] rounded-xl"></div>
                </div>
                <div className="w-full my-2 flex justify-center rounded-md p-2">
                    <div className="overflow-x-auto flex gap-2 w-full">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="flex justify-center">
                                <div className="bg-gray-300 w-[10vh] md:w-[20vh] h-[10vh] md:h-[20vh] rounded-lg"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="py-4 w-[50%] px-3 md:px-10 animate-pulse">
                <div className="bg-gray-300 h-8 w-1/2 mb-2"></div>
                <div className="bg-gray-300 h-4 w-full mb-2"></div>
                <div className="bg-gray-300 h-4 w-full mb-2"></div>
                <div className="bg-gray-300 h-4 w-1/3 mb-4"></div>

                <div className="py-4 border-b-2 animate-pulse">
                    <div className="bg-gray-300 h-6 w-1/3 mb-2"></div>
                    <div className="w-full gap-2 overflow-x-auto flex cursor-pointer">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="bg-gray-300 px-3 py-1 w-10 h-10 rounded-md"></div>
                        ))}
                    </div>
                </div>

                <div className="py-4 border-b-2 animate-pulse">
                    <div className="bg-gray-300 h-6 w-1/3 mb-2"></div>
                    <div className="flex gap-x-3 w-full gap-2 overflow-x-auto cursor-pointer">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="bg-gray-300 w-8 h-8 rounded-full"></div>
                        ))}
                    </div>
                </div>


                <div className="p-2 flex bg-gray-100 rounded-3xl my-4 items-center w-fit gap-5 px-4 animate-pulse">
                    <div className="bg-gray-300 w-6 h-6 rounded-full"></div>
                    <div className="bg-gray-300 w-10 h-6"></div>
                    <div className="bg-gray-300 w-6 h-6 rounded-full"></div>
                </div>

                <div className="hidden md:block my-2 animate-pulse">
                    <div className="flex gap-2">
                        <div className="bg-gray-300 w-24 h-10 rounded-full"></div>
                        <div className="bg-gray-300 w-24 h-10 rounded-full"></div>
                    </div>
                </div>

                <span className="py-4 animate-pulse">
                    <div className="bg-gray-300 h-6 w-1/4 mb-4"></div>
                    <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
                </span>

                <div className="mt-4 animate-pulse">
                    <div className="bg-gray-300 h-6 w-1/3 mb-2"></div>
                    <div className="bg-gray-300 h-4 w-1/4"></div>
                </div>
            </div>
        </div>
    )
}

export default SingleProductSkeleton