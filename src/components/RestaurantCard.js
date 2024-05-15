import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props; // destructing the props
  const { cloudinaryImageId, name, costForTwo, cuisines, avgRating, sla } =
    resData?.info;
  // const {slaString} = resData?.info.sla;

  return (
    <div className="p-4 m-4 w-[250px] rounded-xl">
      <div>
        <img
          className=" rounded-xl h-56 w-56"
          alt="res-logo"
          src={CDN_URL + cloudinaryImageId}
        />
      </div>

      <h3 className="font-bold"> {name}</h3>
      <p className="font-bold">
        {avgRating} stars &nbsp; {sla?.slaString}
      </p>
      <h4 className=" font-thin"> {costForTwo}</h4>
      <h4 className=" font-thin"> {cuisines.join(", ")}</h4>
    </div>
  );
};

// to add label to the card (Higher order Functions)
export const withRecommendedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-gray-500 text-white rounded-lg ">
          Recommended
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
