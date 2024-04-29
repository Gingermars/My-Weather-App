import React, { useState } from "react";
import "./WeatherApp.css";

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/Clouds.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import clear_background from "../backgrounds/clear.jpg";
import clouds_background from "../backgrounds/clouds.jpg";
import drizzle_background from "../backgrounds/drizzle.jpg";
import rain_background from "../backgrounds/rain.jpg";
import snow_background from "../backgrounds/snow.jpg";

const WeatherApp = () => {
  let api_key = "1192279759aeaf8e5435b600f901aa0b";

  const [wicon, setWicon] = useState(cloud_icon);
  const [backgroundImg, setBackgroundImg] = useState(clear_background);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}&units=metric`;

    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    if (data.cod !== 200) {
      element[0].value = data.message;
      return;
    }

    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = Math.floor(data.wind.speed) + " Km/h";
    temperature[0].innerHTML = Math.floor(data.main.temp) + "°C";
    location[0].innerHTML = data.name;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clear_icon);
      setBackgroundImg(clear_background);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setWicon(cloud_icon);
      setBackgroundImg(clouds_background);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setWicon(drizzle_icon);
      setBackgroundImg(drizzle_background);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setWicon(rain_icon);
      setBackgroundImg(rain_background);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setWicon(snow_icon);
      setBackgroundImg(snow_background);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setWicon(clear_icon);
    }
  };

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${backgroundImg})`,
      }}
    >
      <div className="container">
        <div className="top-bar">
          <input type="text" className="cityInput" placeholder="search" />
          <div
            className="search-icon"
            onClick={() => {
              search();
            }}
          >
            <img className="search" src={search_icon} alt="" />
          </div>
        </div>
        <div className="weather-image">
          <img src={wicon} alt="" />
        </div>
        <div className="weather-temp">24°C</div>
        <div className="weather-location">Lagos</div>
        <img src="" alt="" />
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">64%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="" className="icon" />
            <div className="data">
              <div className="wind-rate">18 Km/h</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
