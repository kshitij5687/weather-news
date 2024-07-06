// src/components/WeatherWidget.js
import React, { useState, useEffect } from 'react';
import './WeatherWidget.css';

const WeatherWidget = () => {
  const [location, setLocation] = useState('London');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=bb7f4344d7d219f28a85e784bcb4f9e1`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeather(data);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError('Failed to fetch weather data');
        setWeather(null); // Clear previous weather data if there's an error
      }
    };
    fetchWeather();
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setLocation(inputValue);
    }
  };

  return (
    <div className="weather-widget">
    <h2>Weather in {location}</h2>
    <form onSubmit={handleSubmit} className="weather-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a location"
      />
      <button type="submit">Get Weather</button>
    </form>
    {error && <div className="error">{error}</div>}
    {weather && (
      <div className="weather-info">
        <p>Temperature: {weather.main.temp} °C</p>
        <p>Condition: {weather.weather[0].description}</p>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          alt="weather icon"
        />
      </div>
    )}
  </div>
);
};

export default WeatherWidget;