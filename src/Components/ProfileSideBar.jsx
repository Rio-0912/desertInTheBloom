import React from "react";
import { CgProfile } from "react-icons/cg";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdFavoriteBorder } from "react-icons/md";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const ProfileSideBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Use this to get the current path

  return (
      <div className="md:p-2 p-[2px] h-full w-full bg-gray-100 shadow-lg flex flex-col md:flex-row gap-2">
          <div className="w-full md:w-[12%] h-[7vh] md:h-full">
              <p className="text-lg hidden sm:block font-semibold p-2">My Account</p>
              <div className="flex overflow-y-auto md:flex-col w-[100%]">
                  <p
                      onClick={() => navigate("/profile")}
                      className={`flex ${location.pathname === "/profile" ? "bg-white text-black shadow border-b-2 md:border-b-0 md:border-l-4 border-[#c9b156]" : ""} font-semibold text-sm gap-x-2 w-full items-center my-1 cursor-pointer p-[7px] select-none`}
                  >
                      <CgProfile size={15} /> My details
                  </p>
                  <p
                      onClick={() => navigate("/profile/orders")}
                      className={`flex ${location.pathname === "/profile/orders" ? "bg-white text-black shadow border-b-2 md:border-b-0 md:border-l-4 border-[#c9b156]" : ""} font-semibold text-sm gap-x-1 w-full my-1 items-center cursor-pointer p-[6px] select-none`}
                  >
                      <CiDeliveryTruck size={17} /> My orders
                  </p>
                 
              </div>
          </div>
          <div className="w-full h-fit md:h-full p-5 overflow-y-auto md:w-[88%] md:p-4 rounded-md bg-white">
              <Outlet />
          </div>
      </div>
  );
};

export default ProfileSideBar;
