import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch, FaWind, FaTint } from 'react-icons/fa';
import './Weather.css';

const API_KEY = 'cb8607f51e9727e78e84b8593c3a89b3';

function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      setError('');
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      // Convert temperature from Kelvin to Celsius
      const weatherData = {
        ...response.data,
        main: {
          ...response.data.main,
          temp: response.data.main.temp - 273.15, // Convert to Celsius
        },
      };
      setWeatherData(weatherData);
    } catch (err) {
      setError('City not found');
      setWeatherData(null);
    }
  };
  

  return (
    <div className="weather-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>
          <FaSearch />
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          {/* <h3>{new Date().toLocaleDateString()}</h3> */}
          <div className="temp">
            <p>{Math.round(weatherData.main.temp)} °C</p>
            <p>{weatherData.weather[0].description}</p>
          </div>
          <div className="details">
            <p><FaWind /> {weatherData.wind.speed} m/s Wind speed</p>
            <p><FaTint /> {weatherData.main.humidity}% Humidity</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
