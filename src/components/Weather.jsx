import React, { useState, useEffect } from "react";
import styles from "./Weather.module.css";

export function Weather() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const callApi = (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=f67faf19648eabaab7b7f1a2708a019a`;
    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const search = (event) => {
    event.preventDefault();
    callApi(inputValue);
  };

  useEffect(() => {
    const url = "https://geolocation-db.com/json/";
    fetch(url)
      .then((response) => response.json())
      .then((jsonData) => callApi(jsonData.city))
      .catch((err) => console.log(err));
  }, []);

  const getTempStyle = (temp) => {
    if (temp <= 5) return "freezing";
    else if (temp <= 15) return "chill";
    else if (temp <= 25) return "normal";
    else if (temp <= 35) return "hot";
    return "hoter";
  };

  const tempStyle = getTempStyle(data.main.temp);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Weather app</h1>
      <form onSubmit={search}>
        <input
          type="text"
          placeholder="Search city"
          value={inputValue}
          onChange={handleInputChange}
          className={styles.input}
        ></input>
        <button className={styles.search} type="submit">
          Search
        </button>
      </form>
      {data && (
        <>
          <span className={styles.body}>
            {data.name}, {data.sys.country}
          </span>
          <span className={tempStyle}>{Math.round(data.main.temp)}ºC</span>
          <span className={styles.body}>{data.weather[0].description}</span>
        </>
      )}
    </div>
  );
}
