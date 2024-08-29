import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { CDN_URL } from "../utils/constants";
import { decreaseCount, increaseCount, clearCart } from "./CartSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Footer from "./Footer";
const Cart = () => {
  const [content, setContent] = useState(false);
  const [total, setTotal] = useState(0);
  const cartItem = useSelector((store) => store?.cart);
  const dispatch = useDispatch();
  const increaseItem = (i) => {
    dispatch(increaseCount(i));
  };

  const decreaseItem = (i) => {
    dispatch(decreaseCount(i));
  };

  const clearItem = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    setTotal(
      cartItem?.items?.reduce(
        (sum, item) =>
          (sum + item[0]?.defaultPrice / 100 || sum + item[0]?.price / 100) *
          item[1],
        0
      )
    );
  });

  return (
    <div>
      <div className="w-8/12  text-center  lg:px-48 py-10 m-auto ">
        <a href="#" className="fixed bottom-[5%] right-0 m-12">
          <IoIosArrowDropupCircle className="text-5xl text-orange-500 cursor-pointer" />
        </a>
        {cartItem?.restaurant != null && (
          <h1 className="text-4xl font-bold mb-2 lg:w-auto sm:w-screen">
            Your <span className="text-orange-500">Cart</span>
          </h1>
        )}

        {cartItem?.restaurant != null ? (
          <div className="shadow-2xl m-2 p-2 rounded-xl border shadow-orange-500 lg:w-auto sm:w-screen">
            <Link to={"/restaurant/" + cartItem?.restaurant?.id}>
              <div className="pr-4 flex flex-row ml-6 mt-6">
                <img
                  src={CDN_URL + cartItem?.restaurant?.cloudinaryImageId}
                  className="w-32 h-32 shadow-xl rounded-lg "
                />
                <div className="flex flex-col items-start ml-4">
                  <span className="font-semibold text-2xl">
                    {cartItem?.restaurant?.name}
                  </span>
                  <span className="font-normal flex items-center">
                    <img
                      src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_25,h_25/equitable_serviceability/es-icons/es-location-icon.png"
                      className="m-1"
                    />
                    {cartItem?.restaurant?.locality}
                  </span>
                </div>
              </div>
            </Link>

            {cartItem?.items?.map((item) => (
              <div className="flex items-center mt-6 justify-between ml-6">
                <div>
                  <span className=" flex items-center ">
                    {item[0]?.itemAttribute?.vegClassifier === "NONVEG" ? (
                      <img
                        width="18"
                        height="18"
                        src="https://img.icons8.com/material/24/FF0000/vegetarian-food-symbol.png"
                        alt="vegetarian-food-symbol"
                      />
                    ) : (
                      <img
                        width="18"
                        height="18"
                        src="https://img.icons8.com/material/24/00FF00/vegetarian-food-symbol.png"
                        alt="vegetarian-food-symbol"
                      />
                    )}

                    <p className="ml-1 text-sm flex flex-wrap">
                      {item[0]?.name}
                    </p>
                  </span>
                </div>

                <div className="flex items-center justify-between text-center">
                  <div className="flex border items-center justify-evenly text-orange-500 font-bold bg-white px-2 py-2 rounded-xl shadow-xl mx-8 my-70">
                    <button
                      className="cursor-pointer text-sm"
                      onClick={() => {
                        decreaseItem(item[0]?.id);
                      }}
                    >
                      &minus;
                    </button>
                    <span className="pl-6 pr-6 text-sm">{item[1]}</span>
                    <button
                      className="cursor-pointer text-sm"
                      onClick={() => {
                        increaseItem(item[0]?.id);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <span className="mr-6 text-sm">
                    ₹{item[0]?.defaultPrice / 100 || item[0]?.price / 100}/-
                  </span>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-center ">
              <button
                className=" border  text-sm cursor-pointer text-orange-500 font-bold  p-3 m-2 mt-6 mr-35 rounded-xl shadow-xl "
                onClick={clearItem}
              >
                Clear Cart
              </button>
            </div>
            <div className="border flex items-start ml-6 mr-6 m-auto mt-4 mb-4">
              <div className="p-2 m-2 ">
                <input
                  type="checkbox"
                  className="w-5 h-5 cursor-pointer "
                  onClick={() => {
                    setContent(true);
                    if (content === true) setContent(false);
                  }}
                />
              </div>
              <div className="pr-6 py-3">
                <p className="font-bold flex items-end text-sm ">
                  Opt in for No-contact Delivery
                </p>
                {content === true ? (
                  <span className="font-light text-justify flex items-start text-sm">
                    Our delivery partner will call to confirm. Please ensure
                    that your address has all the required details.
                  </span>
                ) : (
                  <span className="font-light text-justify flex items-start text-sm">
                    Unwell, or avoiding contact? Please select no-contact
                    delivery. Partner will safely place the order outside your
                    door (not for COD)
                  </span>
                )}
              </div>
            </div>

            <p className="flex items-start font-bold m-auto text-sm ml-6 mb-2">
              Bill Details
            </p>
            <div className=" flex items-center text-sm font-light ml-6 justify-between">
              <p>Item Total</p>

              <p className="mr-6">₹{total}/-</p>
            </div>
            <div className=" flex items-center text-sm font-light ml-6 justify-between">
              <p>Delivery Fee</p>
              <p className="mr-6">
                ₹
                {cartItem?.restaurant?.feeDetails?.amount != null
                  ? cartItem?.restaurant?.feeDetails?.amount / 100
                  : 30}
                /-
              </p>
            </div>
            <div className=" flex items-center text-sm font-light ml-6 justify-between">
              <p>GST and Restaurant Charges</p>
              <p className="mr-6">₹101/-</p>
            </div>
            <hr className=" m-2"></hr>
            <div className=" flex items-center  text-base  ml-6 justify-between mt-2">
              <button
                className="cursor-pointer text-orange-500 rounded-xl shadow-2xl font-bold  border p-2 m-2 shadow-orange-500"
                onClick={() => {
                  confirm("Would you like to confirm your order!");
                  const toastId = toast.loading("Processing your payment", {
                    position: "top-center",
                    theme: "dark",
                  });
                  setTimeout(() => {
                    toast.dismiss(toastId);
                    <image src="https://cashfreelogo.cashfree.com/website/landings/instant-settlements/payment-done.png" />;
                    toast.success("Payment successfully", {
                      position: "top-center",
                      autoClose: 500,
                      theme: "colored",
                    });
                  }, 3000);

                  setTimeout(() => {
                    dispatch(clearCart());
                  }, 4000);
                }}
              >
                TO PAY
              </button>

              <p className="mr-6 font-bold">
                ₹
                {total +
                  (cartItem?.restaurant?.feeDetails?.amount != null
                    ? cartItem?.restaurant?.feeDetails?.amount / 100
                    : 30) +
                  101}
                /-
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center px-32 m-auto w-max lg:w-auto  ">
            <div>
              <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"></img>
            </div>
            <div>
              <h2 className="text-xl font-medium">Your cart is empty</h2>
              <p className="text-sm font-light m-2">
                You can go to home page to view more restaurants
              </p>
            </div>

            <button className=" p-2 m-2 font-semibold text-white bg-orange-500 shadow-2xl shadow-orange-500 ">
              <Link to="/">SEE RESTAURANTS NEAR YOU </Link>
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
