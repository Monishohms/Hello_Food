import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import RestaurantNestedCategory from "./RestaurantNestedCategory";
import { useState } from "react";

const restaurantMenu = () => {
  const [showIndex, setShowIndex] = useState(0); // to show the accordions.

  const { resId } = useParams(); // To fetch the restaurant id from the url.

  const resInfo = useRestaurantMenu(resId); // to fetch the restaurant menu.

  if (resInfo === null) return <Shimmer />;
  const { name, avgRatingString, totalRatingsString } =
    resInfo?.cards[2]?.card?.card?.info;

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
      <div>
        <h2 className="font-bold text-2xl  ">{name}</h2>
        <p className="font-light">
          {avgRatingString} stars&nbsp;({totalRatingsString})
        </p>
      </div>

      {/* accordions catagories */}

      {categories.map((c, index) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ? (
          <RestaurantCategory
            data={c?.card?.card}
            showItem={index === showIndex ? true : false}
            SetShowIndex={() => setShowIndex(index)}
          />
        ) : (
          <RestaurantNestedCategory
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
