import ItemList from "./ItemList";
import { IoIosArrowDropdown } from "react-icons/io";
const RestaurantNestedCategory = ({ data, showItem, SetShowIndex }) => {
  const handleClick = () => {
    SetShowIndex();
  };

  return (
    <div>
      <div className="shadow-lg w-6/12 mx-auto my-4 text-center">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-bold text-lg">{data.title}</span>
          <span>
            <IoIosArrowDropdown className="text-2xl" />
          </span>
        </div>

        {data?.categories.map(
          (c) => showItem && <ItemList item={c.itemCards} />
        )}
      </div>
    </div>
  );
};

export default RestaurantNestedCategory;
