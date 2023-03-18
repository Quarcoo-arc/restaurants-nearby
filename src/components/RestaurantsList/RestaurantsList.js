import React, { useContext } from "react";
import RestaurantsContext from "../../context/RestaurantsContext";

const RestaurantsList = () => {
  const { restaurants } = useContext(RestaurantsContext);
  return (
    <div>
      {restaurants &&
        restaurants.map((res, idx) => <h3 key={idx}>{res.name}</h3>)}
    </div>
  );
};

export default RestaurantsList;
