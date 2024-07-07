import ItemList from "./ItemList";
import { IoIosArrowDropdown } from "react-icons/io";

// ** accordions **

const RestaurantCategory = ({ resInfo, data, showItem, SetShowIndex }) => {
  const handleClick = () => {
    SetShowIndex();
  };

  return (
    <div>
      <div className=" shadow-lg w-6/12 mx-auto my-4 text-center ">
        <div
          className=" flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          {/* ** accordions header ** */}

          <span className="font-bold text-lg">
            {data?.title} ({data?.itemCards?.length})
          </span>
          <span>
            <IoIosArrowDropdown className="text-2xl" />
          </span>
        </div>

        {/* ** accordions body ** */}

        {showItem && <ItemList resInfo={resInfo} item={data?.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
