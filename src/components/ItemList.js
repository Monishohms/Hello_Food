import { CDN_URL } from "../utils/constants";
const ItemList = ({ item }) => {
  //console.log(item);

  return (
    <div>
      {item.map((i) => (
        <div className=" m-2 border-gray-200 border-b-2 text-left flex justify-between">
          <div className="w-9/12">
            <p className="font-semibold">{i?.card?.info?.name}</p>
            <p className="font-semibold">
              {" "}
              ₹
              {i?.card?.info?.defaultPrice
                ? i?.card?.info?.defaultPrice / 100
                : i?.card?.info?.price / 100}
            </p>
            <p className="font-light text-sm">{i?.card?.info?.description}</p>
          </div>

          <div className="w-3/12 ">
            <div className="absolute">
              <button className="text-orange-500 font-bold bg-white px-9 py-2 rounded-xl shadow-lg mx-10 my-70">
                {" "}
                ADD{" "}
              </button>
            </div>

            <img
              src={CDN_URL + i?.card?.info?.imageId}
              className="p-1 m-1 w-full h-40 rounded-2xl shadow-xl"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
