import React, { useState, useEffect } from "react";
import Weathercard from "./weathercard";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("Chandausi");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=3b4dea6279b406073c1cfaa750b4e647`;

      let res = await fetch(url);   // return promise whether in future , data will be accepted or rejected
      let data = await res.json();

      const { temp, humidity, pressure } = data.main;   //here we wrote data.mmain because temp, humidity and presure is in temp  (in the weather api)
      const { main: weathermood } = data.weather[0];   // In api weather was given as array of object.  
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);  //here we pass the object which stores all the data.
    } catch (error) {    // if error occurred then catch() will catch that error and show it on console.
      console.log(error);
    }
  };

  useEffect(() => {             //*  On refreshing page, function will be called
    getWeatherInfo();   
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button className="searchButton" type="button" onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>

      {/* our temp card  */}
      <Weathercard {...tempInfo} />
    </>
  );
};

export default Temp;
