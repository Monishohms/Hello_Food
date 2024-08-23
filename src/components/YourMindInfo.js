import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import { IoIosArrowDropupCircle } from "react-icons/io";
import Footer from "./Footer";

const YourMindInfo = () => {
  const { resId } = useParams();
  const [collectionData, setCollectionData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.89960&lng=80.22090&collection=" +
        resId +
        "&tags=&sortBy=&filters=&type=rcv2&offset=0&page_type=null"
    );
    const json = await data.json();
    setCollectionData(json?.data?.cards);
  };

  return (
    <div>
      <div className="w-9/12 m-auto">
        <p className="text-4xl font-semibold pt-8 ml-5">
          {collectionData[0]?.card?.card?.title}
        </p>

        <p className="font-light text-xl pt-3 ml-5">
          {collectionData[0]?.card?.card?.description}
        </p>

        <p className="text-4xl font-semibold pt-3 m-2 ml-5 ">
          Restaurant to explore
        </p>

        <div className="flex flex-wrap  cursor-pointer ">
          {collectionData?.map((e) =>
            e?.card?.card?.info ? (
              <Link to={"/restaurant/" + e?.card?.card?.info?.id}>
                <RestaurantCard resData={e?.card?.card} />
              </Link>
            ) : null
          )}
        </div>
        <a href="#" className="fixed bottom-0 right-0 m-12">
          <IoIosArrowDropupCircle className="text-5xl text-orange-500 cursor-pointer" />
        </a>
      </div>
      <Footer />
    </div>
  );
};

export default YourMindInfo;
