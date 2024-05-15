import { CDN_URL } from "../utils/constants";

const YourMind = ({ imageId, text }) => {
  return (
    <div>
      <img src={CDN_URL + imageId} />
    </div>
  );
};

export default YourMind;
