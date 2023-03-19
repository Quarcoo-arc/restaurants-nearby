import React from "react";
import "./Restaurant.css";
import { ReactComponent as DistanceIcon } from "../../assets/svg/DistanceIcon.svg";
import { ReactComponent as StarIcon } from "../../assets/svg/StarIcon.svg";

const Restaurant = ({
  number,
  coords,
  name,
  address,
  distance,
  ratings,
  noOfRatings,
}) => {
  return (
    <a
      href={`https://www.google.com/maps/place/${coords[0]},${coords[1]}`}
      target="_blank"
      rel="noreferrer"
      className="restaurant"
    >
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
    </a>
  );
};

export default Restaurant;
