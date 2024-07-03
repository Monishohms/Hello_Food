import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem, increaseCount, decreaseCount } from "./CartSlice";
import { useState } from "react";

const ItemList = ({ item }) => {
  const dispatch = useDispatch();
  const count = useSelector((store) => store.cart.count);
  const [button, setButton] = useState(false);
  const [itemId, setItemId] = useState(null);

  const handleItem = (name) => {
    dispatch(increaseCount());
    setItemId(name?.id);
    setButton(true);
    dispatch(addItem(name?.id));
  };

  return (
    <div>
      {item.map((i) => (
        <div className=" m-2  border-gray-200 border-b-2 text-left flex justify-between">
          <div className="w-9/12">
            <p className="font-semibold">{i?.card?.info?.name}</p>

            <p className="font-semibold">
              ₹
              {i?.card?.info?.defaultPrice
                ? i?.card?.info?.defaultPrice / 100
                : i?.card?.info?.price / 100}
            </p>

            <p className="font-light text-sm">{i?.card?.info?.description}</p>
          </div>

          <div className="w-3/12 ">
            <div className="absolute">
              {itemId === i?.card?.info?.id && button && count != 0 ? (
                <span className="flex items-center justify-evenly text-orange-500 font-bold bg-white px-4 py-2 rounded-xl shadow-lg mx-10 my-70">
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      dispatch(decreaseCount());
                    }}
                  >
                    &minus;
                  </button>
                  <span className="pl-6 pr-6">{count}</span>
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      dispatch(increaseCount());
                    }}
                  >
                    +
                  </button>
                </span>
              ) : (
                <button
                  className="text-orange-500 font-bold bg-white px-9 py-2 rounded-xl shadow-lg mx-10 my-70"
                  onClick={() => {
                    handleItem(i?.card?.info);
                  }}
                >
                  ADD
                </button>
              )}
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
