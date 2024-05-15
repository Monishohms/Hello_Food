import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();
  return (
    <div className=" flex justify-between bg-white shadow-lg font-semibold">
      <div className="image-container">
        <img className="  w-52" src={LOGO_URL} />
      </div>

      <div className=" flex items-center ">
        <ul className="flex p-4 m-5">
          <li className=" px-5">
            {" "}
            Internet Status: {onlineStatus ? "🟢 " : "🔴"}{" "}
          </li>
          <li className=" px-5  hover:text-orange-600">
            {" "}
            <Link to="/">Home </Link>
          </li>
          <li className=" px-5  hover:text-orange-600">
            {" "}
            <Link to="/About"> About</Link>
          </li>
          <li className=" px-5  hover:text-orange-600">
            {" "}
            <Link to="/Contact"> Contact-Us</Link>{" "}
          </li>
          <li className=" px-5  hover:text-orange-600">
            {" "}
            <Link to="/cart"> Cart</Link>
          </li>
          <button
            className="px-5 hover:text-orange-600"
            onClick={() => {
              btnName == "Login" ? setBtnName("Log-out") : setBtnName("Login");
            }}
          >
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
