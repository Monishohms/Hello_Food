import { Link } from "react-router-dom";
const Cart = () => {
  return (
    <div className="w-6/12 text-center px-44 py-36 m-auto">
      <div>
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/confusing-woman-due-to-empty-cart-4558760-3780056.png"></img>
      </div>
      <div>
        <h2 className="text-xl font-medium">Your cart is empty</h2>
        <p className="text-sm font-light m-2">
          You can go to home page to view more restaurants
        </p>
      </div>

      <button className=" p-3 m-6 font-semibold text-white bg-orange-500 hover:shadow-lg ">
        <Link to="/">SEE RESTAURANTS NEAR YOU </Link>
      </button>
    </div>
  );
};

export default Cart;
