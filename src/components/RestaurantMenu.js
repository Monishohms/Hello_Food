import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import RestaurantNestedCategory from "./RestaurantNestedCategory";
import { useState } from "react";
import { CDN_URL } from "../utils/constants";
import { FaStar } from "react-icons/fa";
import RestaurantMenuOffer from "./RestaurantMenuOffer";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import Footer from "./Footer";
import { MdOutlineRestaurantMenu } from "react-icons/md";

const restaurantMenu = () => {
  const [showIndex, setShowIndex] = useState(0); // to show the accordions.

  const { resId } = useParams(); // To fetch the restaurant id from the url.

  const resInfo = useRestaurantMenu(resId); // to fetch the restaurant menu.

  if (resInfo === null) return <Shimmer />;
  const {
    name,
    avgRatingString,
    totalRatingsString,
    cloudinaryImageId,
    costForTwo,
    locality,
  } = resInfo?.cards[2]?.card?.card?.info;

  const { slaString } = resInfo?.cards[2]?.card?.card?.info?.sla;
  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (e) =>
        e?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
        e?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
    );

  return (
    <div>
      <div className="text-center p-6 m-6 ">
        <div className="md:max-lg:w-8/12 text-center m-auto sm:w-auto ">
          <h2 className="font-bold text-3xl ">{name}</h2>
          <p className="font-light flex items-center justify-center">
            <FaStar className="m-1 text-green-700" />
            {avgRatingString} stars&nbsp;(
            {totalRatingsString})
          </p>
          <p className="font-light flex items-center justify-center">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_25,h_25/equitable_serviceability/es-icons/es-location-icon.png"
              className="m-1 "
            />
            {locality}
          </p>
        </div>
        <hr className="w-6/12 m-auto p-1 " />
        <div className="w-8/12 text-center flex justify-center items-center sm:m-auto lg:m-0">
          <span className="font-bold flex items-center ">
            <RiMoneyRupeeCircleLine className="m-1 text-2xl " />
            {costForTwo / 100}/-
          </span>
          <span className="flex items-center pl-2 font-bold">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_30,h_30/v1648635511/Delivery_fee_new_cjxumu"
              className="m-1 text-orange-600"
            />
            {slaString}
          </span>
        </div>

        <div className="w-6/12 text-center m-auto p-2 ">
          <img
            src={CDN_URL + cloudinaryImageId}
            className=" rounded-xl h-52 w-60 sm:m-auto lg:m-0"
          />
        </div>

        <div id="res-menu-off" className="m-auto lg:w-6/12 sm:w-screen">
          {resInfo?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.map(
            (offers, idx) => {
              return (
                <RestaurantMenuOffer key={"offers" + idx} {...offers?.info} />
              );
            }
          )}
        </div>
        <p className="my-4 text-xl font-bold flex items-center justify-center">
          <MdOutlineRestaurantMenu className="mr-4 my-4 text-orange-500" /> Menu
          <MdOutlineRestaurantMenu className="ml-4 my-4 text-orange-500" />
        </p>

        {/* accordions catagories */}

        {categories?.map((c, index) =>
          c?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ? (
            <RestaurantCategory
              resInfo={resInfo}
              data={c?.card?.card}
              showItem={index === showIndex ? true : false}
              SetShowIndex={() => setShowIndex(index)}
            />
          ) : (
            <RestaurantNestedCategory
              resInfo={resInfo}
              data={c?.card?.card}
              showItem={index === showIndex ? true : false}
              SetShowIndex={() => setShowIndex(index)}
            />
          )
        )}
      </div>
      <Footer />
    </div>
  );
};

export default restaurantMenu;
