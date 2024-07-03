import { Link } from "react-router-dom";
import { CDN_URL } from "../utils/constants";

const YourMind = ({ imageId, link }) => {
  const urlId = link.slice(35, 40);
  return (
    <div>
      <div className="min-w-36 m-4">
        <Link to={"/collections/" + urlId}>
          <img src={CDN_URL + imageId} className="cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default YourMind;
