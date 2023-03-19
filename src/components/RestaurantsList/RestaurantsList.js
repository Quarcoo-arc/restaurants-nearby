import React, { useContext, useState } from "react";
import RestaurantsContext from "../../context/RestaurantsContext";
import Restaurant from "../Restaurant/Restaurant";
import Pagination from "../Pagination/Pagination";
import "./RestaurantsList.css";

const RestaurantsList = () => {
  const { restaurants } = useContext(RestaurantsContext);
  const [data, setData] = useState(restaurants);
  return (
    <>
      <div className="restaurantsList">
        {data &&
          data
            .slice(0, 10)
            .map((res, idx) => (
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
      <Pagination setData={setData} restaurants={restaurants} />
    </>
  );
};

export default RestaurantsList;
