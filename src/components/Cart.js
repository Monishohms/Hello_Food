import { Link } from "react-router-dom";
const Cart = () => {
  return (
    <div className="w-6/12 text-center px-56 py-24 m-auto">
      <div>
        <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"></img>
      </div>
      <div>
        <h2 className="text-xl font-medium">Your cart is empty</h2>
        <p className="text-sm font-light m-2">
          You can go to home page to view more restaurants
        </p>
      </div>

      <button className=" p-2 m-2 font-semibold text-white bg-orange-500 hover:shadow-lg ">
        <Link to="/">SEE RESTAURANTS NEAR YOU </Link>
      </button>
    </div>
  );
};

export default Cart;
