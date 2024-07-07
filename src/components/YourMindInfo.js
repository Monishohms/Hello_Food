import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";

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
    <div className="w-9/12 m-auto">
      <p className="text-4xl font-semibold pt-8 ">
        {collectionData[0]?.card?.card?.title}
      </p>

      <p className="font-light text-xl pt-3">
        {collectionData[0]?.card?.card?.description}
      </p>

      <p className="text-4xl font-semibold pt-3 ">Restaurant to explore</p>

      <div className="flex flex-wrap  cursor-pointer ">
        {collectionData?.map((e) =>
          e?.card?.card?.info ? (
            <Link to={"/restaurant/" + e?.card?.card?.info?.id}>
              <RestaurantCard resData={e?.card?.card} />
            </Link>
          ) : null
        )}
      </div>
    </div>
  );
};

export default YourMindInfo;
