import React from "react";
import { OFFER_LOGO_URL } from "../utils/constants";

const RestaurantMenuOffer = (offers) => {
  const { offerTag, offerLogo, header, couponCode, description } = offers;
  const idx = offers.idx;
  return (
    <div id="res-menu-offbox" key={"offer" + idx}>
      <div>
        <h4>
          <img src={OFFER_LOGO_URL + offerLogo} />
          {header}
        </h4>
        <div>
          <h5>
            {couponCode} |&nbsp;
            {description}
          </h5>
        </div>
      </div>
    </div>
  );
};
export default RestaurantMenuOffer;
