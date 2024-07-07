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
    <div className="text-center p-6 m-6">
      <div className="w-8/12 text-center m-auto">
        <h2 className="font-bold text-3xl ">{name}</h2>
        <p className="font-light flex items-center justify-center">
          <FaStar className="m-1 text-green-700" />
          {avgRatingString} stars&nbsp;(
          {totalRatingsString})
        </p>
        <p className="font-light flex items-center justify-center">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_25,h_25/equitable_serviceability/es-icons/es-location-icon.png"
            className="m-1"
          />
          {locality}
        </p>
      </div>
      <hr className="w-6/12 m-auto p-1 " />
      <div className="w-8/12 text-center flex justify-center items-center">
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
          className=" rounded-xl h-52 w-60 "
        />
      </div>

      <div id="res-menu-off" className="m-auto">
        {resInfo?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers?.map(
          (offers, idx) => {
            return (
              <RestaurantMenuOffer key={"offers" + idx} {...offers?.info} />
            );
          }
        )}
      </div>

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
  );
};

export default restaurantMenu;

// map method return karta hai ok

// or jab hum ex -
// /ab doneo sahi hai
// ye karte hai to return nhi karta hai kyo ki humne return hi nhi kiya agar isme { }  ye ho to isse hume return kartana parta hai
// items.map((item)=>{
// console.log("hi hello ")

//return  <h4>hello<h4>
// })

// iss tarah nhi to isse hum direct likhte hai
// ye ab direct return karega ok done
// items.map((item)=>
//  <h4>hello<h4>
// )

// done

// aa rha hai na

// jab hume kuch or check karna hota hai jaise consolog karana hota hai to hum ak sath do ko nhi likh sakte hai kyo ki ak hi return hota hai do nhi issi liye hum
// {} hum ye use karta hai nhi to direct

// samjhe ya mai bole ja raha hu ..............
