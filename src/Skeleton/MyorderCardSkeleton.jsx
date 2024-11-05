import React from 'react'

function MyorderCardSkeleton() {
    return (
        <div>
            <div className="rounded-lg flex border my-2 pr-0 p-2 md:px-6 md:py-4 animate-pulse">
                <div className="w-[95%]">
                    <section className="text-xs flex gap-2 mb-3 items-center">
                        <p className="rounded-full border px-4 font-medium py-[2px] bg-gray-300 w-16 h-4"></p>
                        <p className="bg-gray-300 w-1 h-4"></p>
                        <p className="font-medium bg-gray-300 w-32 h-4"></p>
                    </section>
                    <section className="flex items-center gap-2 md:gap-4">
                        <div className="w-20 h-20 rounded-lg bg-gray-300"></div>
                        <section className="flex-1">
                            <p className="font-semibold text-xs md:text-sm text-gold_dark my-1 bg-gray-300 w-32 h-4"></p>
                            <p className="text-xs bg-gray-300 w-48 h-4"></p>
                            <p className="text-xs md:text-sm font-medium bg-gray-300 w-24 h-4 mt-2"></p>
                        </section>
                    </section>
                </div>
                <div className="w-[5%] flex items-center justify-end">
                    <div className="bg-gray-300 w-6 h-6 rounded-full"></div>
                </div>
            </div>
        </div>
    )
}

export default MyorderCardSkeleton