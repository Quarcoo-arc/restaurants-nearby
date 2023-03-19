import React from "react";
import "./Restaurant.css";
import { ReactComponent as DistanceIcon } from "../../assets/svg/DistanceIcon.svg";
import { ReactComponent as StarIcon } from "../../assets/svg/StarIcon.svg";

const Restaurant = ({
  number,
  name,
  address,
  distance,
  ratings,
  noOfRatings,
}) => {
  return (
    <div className="restaurant">
      <p className="num">{number + 1}</p>
      <div>
        <h3>{name}</h3>
        <h6>{address}</h6>
      </div>
      <div className="restaurant-info">
        <p>
          <DistanceIcon width="1.6rem" fill="white" /> <span>{distance}</span>
        </p>
        <p className="rating">
          {ratings}/5 <StarIcon width="1rem" fill="gold" /> ({noOfRatings})
        </p>
      </div>
    </div>
  );
};

export default Restaurant;
