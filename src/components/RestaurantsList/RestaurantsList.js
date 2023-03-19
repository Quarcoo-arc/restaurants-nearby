import React, { useContext } from "react";
import RestaurantsContext from "../../context/RestaurantsContext";
import Restaurant from "../Restaurant/Restaurant";
import "./RestaurantsList.css";

const RestaurantsList = () => {
  const { restaurants } = useContext(RestaurantsContext);
  return (
    <div className="restaurantsList">
      {restaurants &&
        restaurants.map((res, idx) => (
          <Restaurant
            key={res.place_id}
            number={idx}
            distance={res.distance}
            address={res.vicinity}
            name={res.name}
            noOfRatings={res.user_ratings_total}
            ratings={res.rating}
          />
        ))}
    </div>
  );
};

export default RestaurantsList;
