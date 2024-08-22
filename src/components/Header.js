import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { TbPokeball } from "react-icons/tb";
import { TiContacts } from "react-icons/ti";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const itemCart = useSelector((store) => store.cart.items);

  return (
    <div className=" flex justify-between shadow-lg font-semibold lg:w-screen sm:w-max  w-max">
      <div className="image-container lg:pl-28 ">
        <Link to="/">
          <img className=" lg:pl-10 md:pl-10 w-52 " src={LOGO_URL} />
        </Link>
      </div>

      <div className=" flex items-center lg:pr-36 ">
        <React.Fragment>
          <span className=" px-5   hover:text-orange-600">
            <Link to="/About" className="flex items-center">
              <TbPokeball className="m-1 text-2xl" /> About
            </Link>
          </span>
          <span className=" px-5  hover:text-orange-600">
            <Link to="/Contact" className="flex items-center">
              <TiContacts className="m-1 text-2xl" />
              Contact-Us
            </Link>
          </span>
          <div className="flex items-center text-center  ">
            <span className=" px-4   hover:text-orange-600">
              <Link to="/cart" className="flex items-center ">
                {itemCart.length != 0 && (
                  <span class="flex h-2 w-2 items-center justify-center rounded-full bg-orange-500 p-2 text-xs text-white absolute top-[4%] left-[78%]">
                    {itemCart.length}
                  </span>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="file: m-1 h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                Cart
              </Link>
            </span>
          </div>

          <Link to={"/login"}>
            <button
              className="px-5 hover:text-orange-600 flex items-center"
              onClick={() => {
                btnName === "Login"
                  ? setBtnName("Log-out")
                  : setBtnName("Login");
              }}
            >
              <FaRegUser className="m-1 text-xl" />
              {btnName}
            </button>
          </Link>
        </React.Fragment>
      </div>
    </div>
  );
};

export default Header;
