import ItemList from "./ItemList";
import { BsFillCaretDownFill } from "react-icons/bs";

// ** accordions **

const RestaurantCategory = ({ data, showItem, SetShowIndex }) => {
  const handleClick = () => {
    SetShowIndex();
  };

  return (
    <div>
      <div className=" shadow-lg w-6/12 mx-auto my-4 text-center">
        <div
          className=" flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          {/* ** accordions header ** */}

          <span className="font-bold text-lg">
            {" "}
            {data?.title} ({data?.itemCards?.length})
          </span>
          <span>
            {" "}
            <BsFillCaretDownFill className="text-orange-500 text-2xl" />{" "}
          </span>
        </div>

        {/* ** accordions body ** */}

        {showItem && <ItemList item={data?.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
