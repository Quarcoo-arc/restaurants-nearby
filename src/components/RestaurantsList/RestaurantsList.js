import React, { useContext, useEffect, useState } from "react";
import RestaurantsContext from "../../context/RestaurantsContext";
import Restaurant from "../Restaurant/Restaurant";
import "./RestaurantsList.css";

const RestaurantsList = () => {
  const { data, pageNum, sortBy } = useContext(RestaurantsContext);
  const [restaurants, setRestaurants] = useState(data);

  useEffect(() => {
    setRestaurants(data.slice(10 * (pageNum - 1), 10 * pageNum));
  }, [data, pageNum, sortBy]);

  return (
    <>
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
              coords={res.coords}
            />
          ))}
      </div>
    </>
  );
};

export default RestaurantsList;
