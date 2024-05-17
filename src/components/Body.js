import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { withRecommendedLabel } from "./RestaurantCard";
import { SWIGGY_API } from "../utils/constants";
import YourMind from "./YourMind";
import { CDN_URL } from "../utils/constants";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]); // original list of restaurants

  const [filteredRestaurants, setFilteredfRestaurants] = useState([]); //make a copy of listOfRestaurants for searching/filtering restaurants

  const [searchText, setSearchText] = useState(" "); //search text for filtering restaurants

  const status = useOnlineStatus(); // to check if the user is online or not

  const RestaurantCardRecommended = withRecommendedLabel(RestaurantCard); // to add the recommended label to the restaurant card

  const [mind, setMind] = useState([]);

  const [restaurantChain, setRestaurantChain] = useState([]);

  // to get the data from the Swiggy's api
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(SWIGGY_API);
    const jsonData = await response.json();
    console.log(jsonData.data);

    setListOfRestaurants(
      jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setFilteredfRestaurants(
      jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );

    //console.log(jsonData?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info);
    setMind(
      jsonData?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info
    );

    setRestaurantChain(
      jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  };

  console.log(mind);
  console.log(restaurantChain);

  // to check if the user is online or not
  if (status === false) return <h1> You're in Offline mode !!! </h1>;

  return listOfRestaurants?.length == 0 ? (
    <Shimmer />
  ) : (
    <div className="w-9/12 m-auto">
      <h1 className=" font-bold text-2xl p-4"> What's on your mind? </h1>
      <div className="overflow-x-auto flex">
        {mind?.map((e) => (
          <img className="w-36" src={CDN_URL + e?.imageId} />
        ))}
      </div>

      <h1 className=" font-bold text-2xl p-4 cursor-pointer">
        {" "}
        Top restaurant chains in chennai
      </h1>

      <div className="flex overflow-x-scroll w-screen h-full">
        {restaurantChain?.map((e) => (
          <RestaurantCard resData={e} />
        ))}
      </div>

      <div className="flex items-center p-4 m-4">
        <div className=" rounded-l-2xl border-black">
          <input
            type="text"
            className="rounded-lg border border-black"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button
            className=" p-2 m-2 font-semibold hover:text-orange-500"
            onClick={() => {
              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredfRestaurants(filteredRestaurant);
            }}
          >
            {/*Filter the RestaurantCard and update the util
                    for that we need search text */}
            Search{" "}
          </button>
        </div>

        <div className="filter">
          <button
            className="p-4 m-4 hover:text-orange-500 font-semibold"
            onClick={() => {
              const filteredList = listOfRestaurants?.filter(
                (res) => res.info.avgRating > 4
              );
              setFilteredfRestaurants(filteredList);
              console.log("button was clicked");
            }}
          >
            {" "}
            Top Rated Restaurant{" "}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap cursor-pointer ">
        {filteredRestaurants?.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurant/" + restaurant.info.id}
          >
            {/* {if the restaurant is promoted then show promoted Restaurant card...} */}
            {restaurant.info.avgRating > 4.2 ? (
              <RestaurantCardRecommended resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Body;
