import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { withRecommendedLabel } from "./RestaurantCard";
import { SWIGGY_API } from "../utils/constants";
import YourMind from "./YourMind";
import { CgSearch } from "react-icons/cg";
import { AiTwotoneRightCircle } from "react-icons/ai";
import { AiTwotoneLeftCircle } from "react-icons/ai";
import { IoIosArrowDropupCircle } from "react-icons/io";
import Footer from "./Footer";
import search_banner from "../images/search_banner.jpg";

const Body = () => {
  const [allRestaurant, setAllRestaurant] = useState([]); // All Restaurant Data
  const [listOfRestaurants, setListOfRestaurants] = useState([]); // original list of restaurants

  const [filteredRestaurants, setFilteredfRestaurants] = useState([]); //make a copy of listOfRestaurants for searching/filtering restaurants

  const [searchText, setSearchText] = useState(""); //search text for filtering restaurants

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

  return listOfRestaurants?.length == 0 ? (
    <Shimmer />
  ) : (
    <div>
      <div className="lg:w-10/12 lg:m-auto ">
        <span className="flex items-center justify-between mt-4 px-0 ">
          <h1 className=" font-bold text-2xl p-4 ">
            {allRestaurant?.data?.cards[0]?.card?.card?.header?.title}
          </h1>
          <span className=" flex items-center justify-end ">
            <AiTwotoneLeftCircle className="mr-4 text-4xl cursor-pointer" />
            <AiTwotoneRightCircle className=" text-4xl cursor-pointer" />
          </span>
        </span>

        <span className="overflow-x-auto  flex w-[100%] m-auto ">
          {mind?.map((e) => (
            <YourMind
              imageId={e?.imageId}
              link={e?.action?.link}
              name={e?.action?.text}
            />
          ))}
        </span>

        <hr className="topBrandHr" />
        <span className="flex items-center justify-between mt-10 px-0">
          <h1 className=" font-bold text-2xl p-2 cursor-pointer">
            {allRestaurant?.data?.cards[1]?.card?.card?.header?.title}
          </h1>
          <span className=" flex items-center justify-end ">
            <AiTwotoneLeftCircle className="mr-4 text-4xl cursor-pointer  " />
            <AiTwotoneRightCircle className=" text-4xl cursor-pointer" />
          </span>
        </span>

        <div className="flex overflow-x-scroll  no-scrollbar-custom  w-[100%] ">
          {restaurantChain?.map((e) => (
            <Link to={"/restaurant/" + e?.info?.id}>
              <RestaurantCard resData={e} />
            </Link>
          ))}
        </div>
      </div>
      <div className="w-screen h-80 relative mt-4">
        <img
          src={search_banner}
          className="w-full h-full shadow-lg"
          alt="search-banner img"
        />
        <div className=" translate-x-[-50%] translate-y-[-50%] absolute top-[50%] left-[50%] w-full h-80 bg-black bg-opacity-30">
          <p className="mt-24 text-4xl font-bold text-white text-center ">
            Find dining options in Chennai
          </p>
          <div className="flex items-center rounded-xl mr-2 justify-center mt-6">
            <input
              type="text"
              placeholder="Search Restaurant..."
              className="p-2 rounded-l-xl px-16 w-auto  text-center shadow-lg outline-none  "
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <button
              className=" font-semibold rounded-r-xl shadow-lg px-2 outline-none border-orange-500 bg-orange-500"
              onClick={() => {
                const filteredRestaurant = restaurantChain.filter((res) =>
                  res.info.name.toLowerCase().includes(searchText.toLowerCase())
                );
                setFilteredfRestaurants(filteredRestaurant);
              }}
            >
              <CgSearch className="text-3xl m-1" />
            </button>
          </div>
        </div>
      </div>

      <div className="w-10/12 m-auto">
        <p className=" font-bold text-2xl p-4 px-6 ">
          {allRestaurant?.data?.cards[2]?.card?.card?.title}
        </p>
        <div className="flex items-center ">
          <div className="flex items-center w-max">
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
                {filter === "top" && (
                  <IoClose className=" m-1 cursor-pointer " />
                )}
              </button>
            </div>
            <div>
              <button
                className="px-4 py-2 m-4 mr-2 font-medium border rounded-xl shadow-lg flex items-center focus:border-black"
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
                      res?.info?.aggregatedDiscountInfoV3?.header?.includes(
                        "OFF"
                      )
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

        <div className="flex flex-wrap cursor-pointer justify-normal  ">
          {filteredRestaurants?.map((restaurant) => (
            <Link
              key={restaurant.info.id}
              to={"/restaurant/" + restaurant.info.id}
            >
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
      <Footer />
    </div>
  );
};
export default Body;
