import React, { useContext } from "react";
import RestaurantsContext from "../../context/RestaurantsContext";
import "./Sort.css";

const Sort = () => {
  const { sortData, sortBy, setSortBy } = useContext(RestaurantsContext);
  const onChange = (e) => {
    setSortBy(e.target.id);
    sortData(e.target.id);
  };

  return (
    <div className="sort_wrapper">
      <h4>Sort By:</h4>
      <span>
        <input
          type="radio"
          name="sort"
          id="restaurant_name"
          checked={sortBy === "restaurant_name"}
          onChange={onChange}
        />{" "}
        <label htmlFor="restaurant_name">Restaurant Name</label>
      </span>

      <span>
        <input
          type="radio"
          name="sort"
          id="ratings"
          checked={sortBy === "ratings"}
          onChange={onChange}
        />{" "}
        <label htmlFor="ratings">Ratings</label>
      </span>

      <span>
        <input
          type="radio"
          name="sort"
          id="distance"
          checked={sortBy === "distance"}
          onChange={onChange}
        />{" "}
        <label htmlFor="distance">Distance</label>
      </span>
    </div>
  );
};

export default Sort;
