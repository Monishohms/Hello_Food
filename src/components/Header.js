import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { TbPokeball } from "react-icons/tb";
import { TiContacts } from "react-icons/ti";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegCircleXmark } from "react-icons/fa6";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();
  return (
    <div className=" flex justify-between bg-white shadow-lg font-semibold ">
      <div className="image-container">
        <Link to="/">
          <img className="  w-52" src={LOGO_URL} />
        </Link>
      </div>

      <div className=" flex items-center ">
        <React.Fragment>
          <span className=" px-5 flex items-center">
            Internet Status:
            {onlineStatus ? (
              <FaRegCircleCheck className="m-1 text-green-600 " />
            ) : (
              <FaRegCircleXmark className="m-1 text-red-600" />
            )}
          </span>
          <span className=" px-5   hover:text-orange-600">
            <Link to="/About" className="flex items-center">
              <TbPokeball className="m-1 text-xl" /> About
            </Link>
          </span>
          <span className=" px-5  hover:text-orange-600">
            <Link to="/Contact" className="flex items-center">
              <TiContacts className="m-1 text-xl" />
              Contact-Us
            </Link>
          </span>
          <span className=" px-5   hover:text-orange-600">
            <Link to="/cart" className="flex items-center">
              <FiShoppingCart className="m-1" />
              Cart
            </Link>
          </span>
          <button
            className="px-5 hover:text-orange-600 flex items-center"
            onClick={() => {
              btnName === "Login" ? setBtnName("Log-out") : setBtnName("Login");
            }}
          >
            <FaRegUser className="m-1" />
            {btnName}
          </button>
        </React.Fragment>
      </div>
    </div>
  );
};

export default Header;
