import { CDN_URL } from "../utils/constants";
import { MdStars } from "react-icons/md";
import { BsDot } from "react-icons/bs";

const RestaurantCard = (props) => {
  const { resData } = props; // destructing the props

  const { cloudinaryImageId, name, cuisines, avgRating, sla } = resData?.info;
  // const {slaString} = resData?.info.sla;

  return (
    <div className="p-3 m-2 overflow-hidden min-w-max rounded-xl hover:-translate-y-5  hover:scale-90 transition-all ">
      <div>
        <img
          className=" rounded-xl h-44 w-60"
          alt="res-logo"
          src={CDN_URL + cloudinaryImageId}
        />
      </div>

      <h3 className="font-bold "> {name}</h3>
      <p className=" flex items-center font-bold">
        <MdStars className="mr-1 text-green-700 font-bold text-2xl " />
        {avgRating} stars &nbsp; <BsDot />
        {sla?.slaString}
      </p>
      {/* <h4 className=" font-thin"> {costForTwo}</h4> */}
      <p className=" font-thin w-60"> {cuisines.join(", ")}</p>
    </div>
  );
};

// to add label to the card (Higher order Functions)
export const withRecommendedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-gray-100 text-black font-semibold rounded-lg border p-1 ">
          Bestseller
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
