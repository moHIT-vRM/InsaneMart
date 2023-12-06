import React, { useCallback, useState } from "react";
import Logo from "../assest/logo.png";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsFillCartFill } from "react-icons/bs";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = useCallback(() => {
    setShowMenu((prevValue) => !prevValue);
  }, []);

  console.log("showMenu")
  
  return (
    <header className="fixed shadow-md w-full h-16 px-4 md:px-4 z-50 bg-white">
      {/*desktop*/}
      <div className="flex items-center h-full justify-between">
        <Link to="/">
          <div className="h-10">
            <img src={Logo} className="h-full" alt="logo error" />
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-7">
          <nav className=" flex gap-4 md:gap-6 text base md:text-lg">
            <Link to={""}>Home</Link>
            <Link to={"menu"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl text-slate-600 relative">
            <BsFillCartFill />
            <div className="absolute bottom-4 left-4 text-white bg-red-500 h-4 w-4 text-sm pb-5 text-center rounded-full m-0">
              0
            </div>
          </div>
          <div className="text-2xl text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer">
              <HiOutlineUserCircle />
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white mt-5 p-2 shadow drop-shadow-md flex flex-col ">
                <Link
                  to={"newproduct"}
                  className="whitespace-nowrap cursor-pointer text-base"
                >
                  New Product
                </Link>
                <Link
                  to={"login"}
                  className="whitespace-nowrap cursor-pointer text-base"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
