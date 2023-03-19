import React, { useState } from "react";
import "./Pagination.css";

const Pagination = ({ restaurants, setData }) => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="pages">
      {Array(Math.ceil(restaurants.length / 10))
        .fill(1)
        .map((el, idx) => (
          <p
            className={selected === idx ? "selected" : ""}
            onClick={() => {
              setSelected(idx);
              setData(restaurants.slice(10 * idx, 10 * idx + 11));
            }}
          >
            {idx + 1}
          </p>
        ))}
    </div>
  );
};

export default Pagination;
