import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const api = "https://api.sampleapis.com/beers/ale";
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [selectedBeer, setSelectedBeer] = useState("");

  const getBeerData = () => {
    axios.get(api).then((response) => {
      if (response.data) {
        const filteredData = response.data.filter(
          (item) => item.rating.average > 4.5
        );
        setData(filteredData);
      }
    });
  };

  useEffect(() => {
    getBeerData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const sorted = data.sort(
        (a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1))
      );
      setSortedData(sorted);
    }
  }, [data]);

  const handleBeerClick = (item) => {
    setSelectedBeer(item.name);
  };

  return (
    <div className="App">
      <h1>Beer List</h1>
      {selectedBeer && (
        <div className="selected-beer">
          <h2>Selected Beer: {selectedBeer}</h2>
        </div>
      )}
      <div className="beer-container">
        {sortedData.map((item, index) => (
          <div
            className="beer"
            key={index}
            onClick={() => handleBeerClick(item)}
          >
            <div className="beer-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="beer-details">
              <p className="beer-name">{item.name}</p>
              <p className="beer-price">{item.price}</p>
              <p className="beer-rating">Rating: {item.rating.average}</p>
              <p className="beer-reviews">Reviews: {item.rating.reviews}</p>
            </div>
          </div>
        ))}
      </div>
     
    </div>
  );
}
