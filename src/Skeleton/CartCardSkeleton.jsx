import React from 'react'

function CartCardSkeleton() {
    return (
        <div>
            <div className="grid my-2 h-fit w-auto grid-cols-[130px,1fr] gap-x-3 p-2 border-b rounded-lg animate-pulse">
                <div className="rounded-lg w-full bg-gray-300 aspect-square"></div>
                <div className="p-2 gap-1">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                    <div className="flex gap-3">
                        <span className="border my-2 rounded-md px-2 py-1 bg-gray-300 w-10 h-6"></span>
                        <span className="border my-2 rounded-full w-7 h-7 bg-gray-300"></span>
                    </div>
                    <div className="flex w-full flex-col md:flex-row gap-2 items-center md:justify-between">
                        <section className="flex w-full md:w-[30%]">
                            <p className="text-sm bg-gray-300 h-4 rounded w-10"></p>
                            <div className="px-4 border rounded-md bg-gray-300 h-8 w-20"></div>
                        </section>
                        <section className="flex gap-3 justify-between">
                            <div className="flex justify-center gap-1 items-end text-gray-300 w-16 h-4 rounded"></div>
                            <div className="flex justify-center gap-1 items-end cursor-pointer text-gray-300 w-16 h-4 rounded"></div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartCardSkeleton