import React, { useState, useEffect } from "react";

const StdCalcData = ({ onPipeSelect, onCalculatorSelect }) => {
  const [selectedOption, setSelectedOption] = useState("standards");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint =
        selectedOption === "standards"
          ? `/api/stdpipe/?_=${Date.now()}`
          : `/api/calcpipe/?_=${Date.now()}`;

      const response = await fetch(endpoint, { cache: "no-store" });
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, [selectedOption]);

  const handleItemClick = (item) => {
    if (selectedOption === "standards") {
      onPipeSelect(item);
    } else {
      onCalculatorSelect(item);
    }
  };

  return (
    <div>
      <h2>Piping Selector</h2>
      <div>
        <label>
          <input
            type="radio"
            value="standards"
            checked={selectedOption === "standards"}
            onChange={() => setSelectedOption("standards")}
          />
          Standards
        </label>
        <label>
          <input
            type="radio"
            value="calculators"
            checked={selectedOption === "calculators"}
            onChange={() => setSelectedOption("calculators")}
          />
          Calculators
        </label>
      </div>

      <div>
        <h3>
          {selectedOption === "standards"
            ? "Standards List"
            : "Calculators List"}
        </h3>
        <ul>
          {data.map((item) => (
            <li key={item.id} onClick={() => handleItemClick(item)}>
              {selectedOption === "standards" ? item.Title : item.Titlec}:{" "}
              {selectedOption === "standards"
                ? item.Description
                : item.Descriptionc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StdCalcData;
