import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { IoClose } from "react-icons/io5";
import { withRecommendedLabel } from "./RestaurantCard";
import { SWIGGY_API } from "../utils/constants";
import YourMind from "./YourMind";
import { CgSearch } from "react-icons/cg";

const Body = () => {
  const [allRestaurant, setAllRestaurant] = useState([]); // All Restaurant Data
  const [listOfRestaurants, setListOfRestaurants] = useState([]); // original list of restaurants

  const [filteredRestaurants, setFilteredfRestaurants] = useState([]); //make a copy of listOfRestaurants for searching/filtering restaurants

  const [searchText, setSearchText] = useState(" "); //search text for filtering restaurants

  const status = useOnlineStatus(); // to check if the user is online or not

  const RestaurantCardRecommended = withRecommendedLabel(RestaurantCard); // to add the recommended label to the restaurant card

  const [mind, setMind] = useState([]);

  const [restaurantChain, setRestaurantChain] = useState([]);

  const [filter, setFilter] = useState("null"); // To undo applied filter

  // to get the data from the Swiggy's api
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(SWIGGY_API);
    const jsonData = await response.json();
    console.log(jsonData?.data?.cards);

    setAllRestaurant(jsonData);

    setListOfRestaurants(
      jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setFilteredfRestaurants(
      jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );

    setMind(
      jsonData?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info
    );

    setRestaurantChain(
      jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  };

  // to check if the user is online or not
  if (status === false) return <h1> You're in Offline mode !!! </h1>;

  return listOfRestaurants?.length == 0 ? (
    <Shimmer />
  ) : (
    <div className="w-9/12 m-auto">
      <h1 className=" font-bold text-2xl p-4">
        {allRestaurant?.data?.cards[0]?.card?.card?.header?.title}
      </h1>
      <div className="overflow-x-scroll  no-scrollbar-custom  flex w-[100%]">
        {mind?.map((e) => (
          <YourMind
            imageId={e?.imageId}
            link={e?.action?.link}
            name={e?.action?.text}
          />
        ))}
      </div>
      <hr className="topBrandHr" />

      <h1 className=" font-bold text-2xl p-4 cursor-pointer">
        {allRestaurant?.data?.cards[1]?.card?.card?.header?.title}
      </h1>

      <div className="flex overflow-x-scroll  no-scrollbar-custom  w-[100%]">
        {restaurantChain?.map((e) => (
          <Link to={"/restaurant/" + e?.info?.id}>
            <RestaurantCard resData={e} />
          </Link>
        ))}
      </div>
      <hr className="topBrandHr" />

      <p className=" font-bold text-2xl p-4">
        {allRestaurant?.data?.cards[2]?.card?.card?.title}
      </p>

      <div className="flex items-center ">
        <div className="flex items-center rounded-xl shadow-lg border-black">
          <input
            placeholder="Search Restaurant..."
            type="text"
            className="p-2 rounded-l-xl   text-center w-full  outline-none border border-yellow-300"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button
            className=" font-semibold rounded-r-xl bg-yellow-100 hover:bg-yellow-200 active:bg-yellow-300 border border-yellow-300 "
            onClick={() => {
              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredfRestaurants(filteredRestaurant);
            }}
          >
            {/*Filter the RestaurantCard and update the util
                    for that we need search text */}
            <CgSearch className="text-3xl m-1" />
          </button>
        </div>

        <div>
          <button
            className="p-2 m-4 font-normal bg-yellow-50 rounded-2xl shadow-lg  focus:bg-yellow-200  hover:bg-yellow-100 focus:font-semibold         
            flex items-center"
            onClick={() => {
              if (filter == "top") {
                setFilter("null");
                setFilteredfRestaurants(listOfRestaurants);
              } else {
                const filteredList = listOfRestaurants?.filter(
                  (res) => res.info.avgRating >= 4.4
                );
                setFilteredfRestaurants(filteredList);
                setFilter("top");
              }
            }}
          >
            Ratings 4.4+
            {filter === "top" && <IoClose className=" m-1 cursor-pointer " />}
          </button>
        </div>

        <div>
          <button
            className="p-2 m-4 font-normal bg-yellow-50 rounded-2xl shadow-lg  focus:bg-yellow-200 hover:bg-yellow-100 focus:font-semibold         
            flex items-center"
            onClick={() => {
              if (filter == "fast") {
                setFilter("null");
                setFilteredfRestaurants(listOfRestaurants);
              } else {
                const filteredList = listOfRestaurants?.filter(
                  (res) => res?.info?.sla?.deliveryTime <= 30
                );
                setFilteredfRestaurants(filteredList);
                setFilter("fast");
              }
            }}
          >
            Fast Delivery
            {filter === "fast" && <IoClose className="  m-1 " />}
          </button>
        </div>

        <div>
          <button
            className="p-2 m-4 font-normal bg-yellow-50 rounded-2xl shadow-lg  focus:bg-yellow-200 hover:bg-yellow-100 focus:font-semibold         
            flex items-center"
            onClick={() => {
              if (filter == "lessthan") {
                setFilter("null");
                setFilteredfRestaurants(listOfRestaurants);
              } else {
                const filteredList = listOfRestaurants?.filter(
                  (res) =>
                    res?.info?.costForTwo?.includes("100") ||
                    res?.info?.costForTwo?.includes("125") ||
                    res?.info?.costForTwo?.includes("150") ||
                    res?.info?.costForTwo?.includes("175") ||
                    res?.info?.costForTwo?.includes("200") ||
                    res?.info?.costForTwo?.includes("225") ||
                    res?.info?.costForTwo?.includes("250") ||
                    res?.info?.costForTwo?.includes("275") ||
                    res?.info?.costForTwo?.includes("300")
                );
                setFilteredfRestaurants(filteredList);
                setFilter("lessthan");
              }
            }}
          >
            Less than Rs.300
            {filter === "lessthan" && <IoClose className="  m-1 " />}
          </button>
        </div>

        <div>
          <button
            className="p-2 m-4 font-normal bg-yellow-50 rounded-2xl shadow-lg  focus:bg-yellow-200 hover:bg-yellow-100 focus:font-semibold         
            flex items-center"
            onClick={() => {
              if (filter == "300to600") {
                setFilter("null");
                setFilteredfRestaurants(listOfRestaurants);
              } else {
                const filteredList = listOfRestaurants?.filter(
                  (res) =>
                    res?.info?.costForTwo?.includes("300") ||
                    res?.info?.costForTwo?.includes("325") ||
                    res?.info?.costForTwo?.includes("350") ||
                    res?.info?.costForTwo?.includes("375") ||
                    res?.info?.costForTwo?.includes("400") ||
                    res?.info?.costForTwo?.includes("425") ||
                    res?.info?.costForTwo?.includes("450") ||
                    res?.info?.costForTwo?.includes("475") ||
                    res?.info?.costForTwo?.includes("500") ||
                    res?.info?.costForTwo?.includes("525") ||
                    res?.info?.costForTwo?.includes("550") ||
                    res?.info?.costForTwo?.includes("575") ||
                    res?.info?.costForTwo?.includes("600")
                );
                setFilteredfRestaurants(filteredList);
                setFilter("300to600");
              }
            }}
          >
            Rs.300-Rs.600
            {filter === "300to600" && <IoClose className="  m-1 " />}
          </button>
        </div>

        <div>
          <button
            className="p-2 m-4 font-normal bg-yellow-50 rounded-2xl shadow-lg focus:bg-yellow-200 hover:bg-yellow-100 focus:font-semibold         
            flex items-center"
            onClick={() => {
              if (filter == "hot") {
                setFilter("null");
                setFilteredfRestaurants(listOfRestaurants);
              } else {
                const filteredList = listOfRestaurants?.filter((res) =>
                  res?.info?.aggregatedDiscountInfoV3?.header?.includes("OFF")
                );
                setFilteredfRestaurants(filteredList);
                setFilter("hot");
              }
            }}
          >
            Hot Offers
            {filter === "hot" && <IoClose className=" m-1 " />}
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
