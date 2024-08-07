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
import { AiTwotoneRightCircle } from "react-icons/ai";
import { AiTwotoneLeftCircle } from "react-icons/ai";
import { IoIosArrowDropupCircle } from "react-icons/io";

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
    //console.log(jsonData?.data?.cards);

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
    <div className="lg:w-9/12 m-auto ">
      <span className="flex items-center justify-between mt-4 sm:px-6 lg:px-0 ">
        <h1 className=" font-bold text-2xl p-4 ">
          {allRestaurant?.data?.cards[0]?.card?.card?.header?.title}
        </h1>
        <span className=" flex items-center justify-end ">
          <AiTwotoneLeftCircle className="mr-4 text-4xl cursor-pointer" />
          <AiTwotoneRightCircle className=" text-4xl cursor-pointer" />
        </span>
      </span>

      <div className="overflow-x-auto flex w-[100%] ">
        {mind?.map((e) => (
          <YourMind
            imageId={e?.imageId}
            link={e?.action?.link}
            name={e?.action?.text}
          />
        ))}
      </div>
      <hr className="topBrandHr" />
      <span className="flex items-center justify-between mt-10 sm:px-6 lg:px-0">
        <h1 className=" font-bold text-2xl p-4 cursor-pointer ">
          {allRestaurant?.data?.cards[1]?.card?.card?.header?.title}
        </h1>
        <span className=" flex items-center justify-end ">
          <AiTwotoneLeftCircle className="mr-4 text-4xl cursor-pointer  " />
          <AiTwotoneRightCircle className=" text-4xl cursor-pointer" />
        </span>
      </span>

      <div className="flex overflow-x-scroll  no-scrollbar-custom  w-[100%] mb-12 ">
        {restaurantChain?.map((e) => (
          <Link to={"/restaurant/" + e?.info?.id}>
            <RestaurantCard resData={e} />
          </Link>
        ))}
      </div>
      <hr className="topBrandHr" />

      <p className=" font-bold text-2xl p-4 sm:px-6 lg:px-0">
        {allRestaurant?.data?.cards[2]?.card?.card?.title}
      </p>

      <div className="lg:flex items-center ">
        <div className="flex items-center rounded-xl mr-2 sm:justify-center sm:my-4">
          <input
            type="text"
            placeholder="Search Restaurant..."
            className="p-2 rounded-l-xl px-10 sm:shadow-orange-500 w-auto  text-center shadow-lg outline-none  "
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button
            className=" font-semibold rounded-r-xl shadow-lg px-2 outline-none border-orange-500 bg-orange-500"
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

        <div className="flex items-center w-max  ">
          <div>
            <button
              className="px-4 py-2 m-4 mr-2 sm:font-bold lg:font-medium border rounded-xl shadow-lg  flex items-center focus:border-black"
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
              className="px-4 py-2 m-4 mr-2 sm:font-bold lg:font-medium border rounded-xl shadow-lg flex items-center focus:border-black"
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
              className="px-4 py-2 m-4 mr-2 sm:font-bold lg:font-medium border  rounded-xl shadow-lg focus:border-black flex items-center "
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
              className="px-4 py-2 m-4 mr-2 sm:font-bold lg:font-medium border  rounded-xl shadow-lg focus:border-black flex items-center "
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
              className="px-4 py-2 m-4 mr-2 sm:font-bold lg:font-medium border  rounded-xl shadow-lg  flex items-center focus:border-black"
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
      </div>

      <div className="flex flex-wrap cursor-pointer sm:justify-evenly md:justify-evenly lg:justify-normal  ">
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
      <a href="#" className="fixed bottom-0 right-0 m-12">
        <IoIosArrowDropupCircle className="text-5xl text-orange-500 cursor-pointer" />
      </a>
    </div>
  );
};
export default Body;
