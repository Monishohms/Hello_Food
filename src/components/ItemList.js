import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem, decreaseCount, increaseCount } from "./CartSlice";
import { BsCurrencyRupee } from "react-icons/bs";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { toast } from "react-toastify";
import { IoSparklesSharp } from "react-icons/io5";
import { IoIosArrowDropupCircle } from "react-icons/io";

const ItemList = ({ resInfo, item }) => {
  const resData = resInfo?.cards[2]?.card?.card?.info;
  const dispatch = useDispatch();
  const itemsCart = useSelector((store) => store.cart);

  const addFood = (i) => {
    dispatch(addItem({ item: [i, 1], restaurant: resData }));
    toast.success("New Item added", {
      position: "top-center",
      autoClose: 500,
      theme: "dark",
    });
  };

  const increaseItem = (i) => {
    dispatch(increaseCount(i));
  };

  const decreaseItem = (i) => {
    dispatch(decreaseCount(i));
  };

  return (
    <div>
      {item.map((i) => (
        <div className=" m-2  border-gray-200 border-b-2 text-left flex justify-between items-center">
          <div className="w-9/12">
            <span className="flex items-center text-center pl-1">
              {i?.card?.info?.itemAttribute?.vegClassifier === "NONVEG" ? (
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

              {i?.cart?.info?.ribbon?.text !== null && (
                <p className="flex items-center text-center text-orange-500 font-semibold">
                  <IoSparklesSharp className="pl-2 text-2xl" />
                  Bestseller
                </p>
              )}
            </span>
            <p className="font-bold pl-1 text-lg opacity-90">
              {i?.card?.info?.name}
            </p>

            <p className="font-semibold flex items-center text-lg opacity-90">
              <BsCurrencyRupee />
              {i?.card?.info?.defaultPrice
                ? i?.card?.info?.defaultPrice / 100
                : i?.card?.info?.price / 100}
              /-
            </p>
            <span className="flex items-center my-1 text-sm font-medium text-green-700">
              <MdOutlineStarPurple500 className=" text-green-700 text-lg mr-1 mt-1 mb-1" />
              {i?.card?.info?.ratings?.aggregatedRating?.rating == null
                ? 4.2
                : i?.card?.info?.ratings?.aggregatedRating?.rating}
              (
              {i?.card?.info?.ratings?.aggregatedRating?.ratingCountV2 !==
                null && i?.card?.info?.ratings?.aggregatedRating?.ratingCountV2}
              )
            </span>

            <p className="font-semibold opacity-65 pb-2 pl-1 mb-8 mr-9 mt-1">
              {i?.card?.info?.description}
            </p>
          </div>

          <div className="w-3/12 flex pb-6">
            <div>
              {i?.card?.info?.imageId == null ? (
                <img
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/red_placeholder"
                  className=" w-full h-40 rounded-xl shadow-xl "
                />
              ) : (
                <img
                  src={CDN_URL + i?.card?.info?.imageId}
                  className=" w-60 h-40 rounded-xl shadow-xl "
                />
              )}
            </div>
            <div className="absolute">
              {itemsCart?.items?.filter(
                (item) => item[0]?.id == i?.card?.info?.id
              ).length == 0 ? (
                <button
                  className=" text-orange-500 font-bold bg-white px-9 py-1.5 rounded-xl cursor-pointer my-36  mx-8 border hover:bg-gray-200"
                  onClick={() => {
                    dispatch(() => {
                      addFood(i?.card?.info);
                    });
                  }}
                >
                  ADD
                </button>
              ) : (
                <span className="flex items-center justify-evenly text-orange-500 font-bold bg-white px-4 py-1.5 rounded-xl my-36 mx-8 border">
                  <button
                    className="cursor-pointer  "
                    onClick={() => {
                      decreaseItem(i?.card?.info?.id);
                    }}
                  >
                    &minus;
                  </button>
                  <span className="pl-6 pr-6">
                    {
                      itemsCart?.items?.find(
                        (item) => item[0]?.id == i?.card?.info?.id
                      )[1]
                    }
                  </span>
                  <button
                    className="cursor-pointer "
                    onClick={() => {
                      increaseItem(i?.card?.info?.id);
                    }}
                  >
                    +
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
      <a href="#" className="fixed bottom-0 right-0 m-12">
        <IoIosArrowDropupCircle className="text-5xl text-orange-500 cursor-pointer scroll-smooth" />
      </a>
    </div>
  );
};

export default ItemList;
