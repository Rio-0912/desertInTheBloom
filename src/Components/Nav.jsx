import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.jpg";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaUserCircle, FaWhatsapp } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { SignOutButton, UserButton, useUser } from '@clerk/clerk-react'
import { CiLogout } from "react-icons/ci";
// import Category from "./Category";

const sampleDropdownData = [
  { _id: "665848587dc800186e0ed16f", name: "Dresses", state: { category: "665848587dc800186e0ed16f" } },
  { _id: "665848357dc800186e0ed167", name: "Blouses", state: { category: "665848357dc800186e0ed167" } },
  { _id: "665848967dc800186e0ed181", name: "TUNICS / KURTAS", state: { category: "665848967dc800186e0ed181" } },
  { _id: "66584c1c7dc800186e0ed195", name: "PALLAZOS & PANTS", state: { category: "66584c1c7dc800186e0ed195" } },
  { _id: "66584c3c7dc800186e0ed19d", name: "DUPATTAS & STOLES", state: { category: "66584c3c7dc800186e0ed19d" } },

];

const DropdownMenu = ({ label, isOpen, toggle, items, onItemClick }) => (
  <div className="relative">
    <span className="cursor-pointer" onClick={toggle}>
      {label}
    </span>
    {isOpen && (
      <div className="absolute w-56 border h-auto max-h-44 top-8 z-20 bg-white shadow rounded-md text-sm overflow-y-scroll">
        {items.map((item) => (
          <p
            key={item._id}
            onClick={() => onItemClick(item._id)}
            className="border-b p-1 hover:bg-gray-100 cursor-pointer"
          >
            {item.name}
          </p>
        ))}
      </div>
    )}
  </div>
);

const Nav = () => {
  // const [currency, setCurrency] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState(() => sessionStorage.getItem('search') || "");
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();
  const [isLogedin, setIsLogedin] = useState(false)
  const detailsRef = useRef(null);
  const url = import.meta.env.VITE_BACKEND;
  const { isSignedIn, hasImage,imageUrl } = useUser()
  const user = useUser();
  // console.log(user.user.imageUrl);


  useEffect(() => {
    sessionStorage.setItem('search', search);
  }, [search]);


  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };


  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate("/products", { state: { q: search } });
      setSearch(""); // Clear the search input after submission
    }
  };

  const handleNavigation = (path, state = {}) => {
    // console.log("Navigating to:", path, "with state:", state); // Debugging
    navigate(path, { state });

  };



  const navItems = [
    // { label: "Home", path: "/" },
    // { label: "Women", path: "/products", state: { category: "women" }, dropdown: true },
    // { label: "Men", path: `/products`, state: { categorys: "66b3d11d9fb33c73be35b7c6" } },
    // { label: "Modest Beauty", path: `/products`, state: { categorys: "66db259298dc750606980a33" } },
    // { label: "Timeless Wear", path: `/products`, state: { categorys: "66db26660f81720dc2db820f" } },
    // { label: "Our Story", path: "/about" },
  ];

  return (
    <div>
      <div className="h-[fit]  flex justify-center w-full bg-[#bda3a7] p-0.7 md:p-1">
       Get Free Shipping All over the India *
      </div>

      <div className="px-2 sm:px-4 h-full items-center w-full flex justify-between shadow">
        <div className={`${showSearch ? "hidden md:flex" : "flex"} items-center gap-2`}>
          <section onClick={() => setNavOpen(!navOpen)} className="sm:hidden">
            <GiHamburgerMenu size={30} />
          </section>
          <div onClick={() => handleNavigation("/")} className="sm:px-2 cursor-pointer">
            <img src={logo} alt="logo" className="md:w-[27%] w-[45%] md:py-2 my-1 md:m-0" />
          </div>
          <section onClick={() => handleNavigation("/cart")} className="cursor-pointer px-2 md:hidden">
            <AiOutlineShoppingCart size={30} />
          </section>
        </div>

        <div className={`${showSearch ? "hidden" : "flex"} md:w-[80%] justify-end md:justify-between`}>
          <div className="hidden md:flex gap-10 text-lg items-center">
            {navItems.map(({ label, path, state, dropdown }) =>
              dropdown ? (
                <DropdownMenu
                  key={label}
                  label={label}
                  isOpen={openMenu === label.toLowerCase()}
                  toggle={() => toggleMenu(label.toLowerCase())}
                  items={sampleDropdownData}
                  // Update where you handle the navigation with the dropdown
                  onItemClick={(id) => handleNavigation(path, { categorys: id, categoryId: id })}

                />
              ) : (
                <span
                  key={label}
                  className="cursor-pointer"
                  onClick={() => handleNavigation(path, state)}
                >
                  {label}
                </span>
              )
            )}
          </div>
          <div className="flex items-center">
            {/* {console.log(useLocation())} */}
            {useLocation().pathname === "/" && <section
              className="cursor-pointer px-2 hidden md:block"
              onClick={() => setShowSearch(!showSearch)}
            >
              {/* <IoMdSearch size={32} color="gray" /> */}
            </section>}
            
           
            {isSignedIn ? (
              <section
                onClick={() => handleNavigation("/profile")}
                className="cursor-pointer px-2 hidden md:block"
              >
                
               {user.user.hasImage ? <img src={user.user.imageUrl} alt="profile" className="rounded-full h-8" /> : <FaUserCircle size={32} />}
              </section>
              // <UserButton  />
            ) : (
              <section
                onClick={() => handleNavigation("/login")}
                className="md:block flex gap-2 font-semibold items-center  text-black text-sm rounded-full px-3 py-[4px]"
              >
                <p className="font-semibold cursor-pointer text-sm">Login</p>
              </section>
            )}
            <section
              onClick={() => {
                handleNavigation("/cart")
              }}
              className="cursor-pointer px-2 hidden md:block"
            >
              <AiOutlineShoppingCart size={32} />
            </section>
          </div>
        </div>
        <div className="text-xs">
          {isSignedIn && <SignOutButton>
            <button><CiLogout size={30} /></button>
          </SignOutButton>}
        </div>
        {showSearch && (
          <div className="flex w-[100%] md:w-[85%] md:gap-4 items-center">
            <div className="w-full md:w-[85%] h-full flex items-center relative">
              <form onSubmit={handleSearch} className="w-full p-3 md:p-0">
                <input
                  type="text"
                  placeholder="Search for products"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="py-[8px] w-full outline px-5 rounded-3xl bg-[#ffffff] text-sm"
                />
              </form>
            </div>
            <GiCancel
              className="cursor-pointer"
              onClick={() => setShowSearch(!showSearch)}
              size={30}
            />
          </div>
        )}
      </div>
      <div
        className={`overflow-hidden absolute left-0 top-0 h-[100svh] ${navOpen ? "w-[90%]" : "w-0"} transition-all duration-300 ease-in-out bg-white z-40`}
      >
        <section className="flex justify-between px-3 pt-6">
          <RxCross2
            size={37}
            onClick={() => {
              setNavOpen(!navOpen);
              setOpenMenu(null);
            }}
            className="cursor-pointer"
          />
          <img src={logo} className="w-[45%]" alt="logo" />
        </section>
        <div className="flex justify-end items-center px-3 mt-5">
          {useLocation().pathname === "/" && <section
            className="cursor-pointer px-2 md:hidden"
            onClick={() => { setShowSearch(!showSearch); setNavOpen(!navOpen); }}
          >
            <IoMdSearch size={28} color="gery" />
          </section>}
          {isSignedIn ? (
            <section
              onClick={() => handleNavigation("/profile")}
              className="cursor-pointer px-2 md:hidden"
            >
              <FaUserCircle size={28} />  
            </section>
          ) : (
            <section
              onClick={() => handleNavigation("/auth/login")}
              className="md:hidden flex gap-2 font-semibold items-center bg-gold_medium text-black text-sm rounded-full px-3 py-[4px]"
            >
              <p className="font-semibold cursor-pointer text-sm">Login</p>
            </section>
          )}
        </div>
        {!openMenu && (
          <div className="flex flex-col gap-3 my-5">
            {navItems.map(({ label }) => (
              <span
                key={label}
                className="flex justify-between items-center border-b p-2"
                onClick={() => {
                  if (label === "Women" || label === "Men") {
                    toggleMenu(label.toLowerCase());
                  } else {
                    handleNavigation("/products", { category: label.toLowerCase() });
                    setNavOpen(!navOpen);
                  }
                }}
              >
                <p>{label}</p>
                {(label === "Women" || label === "Men") && <MdOutlineArrowForwardIos size={15} />}
              </span>
            ))}
          </div>
        )}
        {["women", "men"].includes(openMenu) && (
          <section>
            <div className="flex items-center gap-2 px-2 py-1">
              <MdOutlineArrowBackIosNew
                size={20}
                className="cursor-pointer"
                onClick={() => toggleMenu(openMenu)}
              />
              <p>{openMenu.charAt(0).toUpperCase() + openMenu.slice(1)}</p>
            </div>
            <div className="w-full border-t pb-1 px-2">
              {sampleDropdownData.map((item) => (
                <p
                  key={item._id}
                  onClick={() => {
                    handleNavigation("/products", { category: openMenu, categoryId: item._id });
                    setNavOpen(!navOpen);
                  }}
                  className="border-b p-1 hover:bg-gray-100"
                >
                  {item.name}
                </p>
              ))}
            </div>
          </section>
        )}
      </div>
      
    </div>
  );
};

export default Nav;
