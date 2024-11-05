import React from 'react'

function ProfileSkeleton() {
    return (
        <div>
            <div className="w-full">
                <section className="flex gap-5 items-center bg-gradient-to-b bg-gray-300 p-4 rounded-md animate-pulse">
                    <div className="rounded-full p-2 bg-gray-50 shadow w-12 h-12"></div>
                    <section>
                        <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </section>
                </section>
                <div className="w-full my-1 px-2 md:px-0">
                    <div className="flex flex-col gap-2 w-[100%]">
                        <div className="w-[100%] flex flex-col md:flex-row items-center gap-3">
                            <div className="w-full md:w-[50%]">
                                <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                                <div className="h-8 bg-gray-300 rounded w-full"></div>
                            </div>
                            <div className="w-full md:w-[50%]">
                                <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                                <div className="h-8 bg-gray-300 rounded w-full"></div>
                            </div>
                        </div>
                        <div className="w-[100%] flex flex-col md:flex-row items-center gap-3">
                            <div className="w-full md:w-[50%]">
                                <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                                <div className="h-8 bg-gray-300 rounded w-full"></div>
                            </div>
                        </div>
                        <div>
                            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                            <div className="h-20 bg-gray-300 rounded w-full"></div>
                        </div>
                        <div className="flex gap-3">
                            <div className="h-8 bg-gray-300 rounded w-20"></div>
                            <div className="h-8 bg-gray-300 rounded w-20"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSkeleton