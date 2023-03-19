import React, { useContext, useState } from "react";
import RestaurantsContext from "../../context/RestaurantsContext";
import "./Pagination.css";

const Pagination = () => {
  const { restaurants, pageNum, setPageNum } = useContext(RestaurantsContext);
  return (
    <div className="pages">
      {Array(Math.ceil(restaurants.length / 10))
        .fill(1)
        .map((el, idx) => (
          <p
            key={idx}
            className={pageNum - 1 === idx ? "selected" : ""}
            onClick={() => {
              setPageNum(idx + 1);
            }}
          >
            {idx + 1}
          </p>
        ))}
    </div>
  );
};

export default Pagination;
