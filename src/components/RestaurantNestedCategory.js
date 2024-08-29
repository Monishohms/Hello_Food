import ItemList from "./ItemList";
import { RiArrowDownSLine } from "react-icons/ri";

const RestaurantNestedCategory = ({
  resInfo,
  data,
  showItem,
  SetShowIndex,
}) => {
  const handleClick = () => {
    SetShowIndex();
  };

  return (
    <div>
      <div className="shadow-lg lg:w-8/12 mx-auto my-4 text-center sm:w-screen">
        <div
          className="flex justify-between cursor-pointer py-3 my-2 px-4"
          onClick={handleClick}
        >
          <span className="font-bold text-lg">{data.title}</span>
          <span>
            <RiArrowDownSLine className="text-3xl cursor-pointer" />
          </span>
        </div>

        {data?.categories.map(
          (c) => showItem && <ItemList resInfo={resInfo} item={c.itemCards} />
        )}
      </div>
    </div>
  );
};

export default RestaurantNestedCategory;
