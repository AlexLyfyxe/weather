import React from "react";
import { useState } from "react";
import axios from "axios";

export default function Weather() {

  const [city, setCity] = useState('');
  const [weatherDate, setWeatherDate] = useState(null);

  const [error, setError] = useState(null);

  const WWW = 'https://api.openweathermap.org/data/2.5/weather';
  const APIKEY = '25fa81762c3215a26b2b8277f4a2c9ad';


  const getWeather = async () => {
    if (!city) {
      setError('Please enter a city');
      setWeatherDate(null)
      return
    }

    try {
      setWeatherDate(null);
      const response = await axios.get(`${WWW}?q=${city}&units=metric&appid=${APIKEY}`);
      setWeatherDate(response.data)
      setError(null)
    } catch (error) {
      setError('Please enter a city');
      console.error(error)
    }
  }

  return (
    <>
      <div className="container">
        <div className="content">
          <h1>Weather App</h1>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getWeather}>
            Get Weather
          </button>


          {error && <p className="error">{error}</p>}
        </div>
      </div>

      {weatherDate && (
        <div className="content_information">

          <div className="content_information_left">
            <h1>{weatherDate.name} / {weatherDate.sys.country}</h1>
            <p>{weatherDate.main.temp}°</p>


            <div> <span>{weatherDate.weather[0].main}</span>
              {weatherDate.weather[0].icon && (
                <img src={`https://openweathermap.org/img/w/${weatherDate.weather[0].icon}.png`} />
              )}
            </div>
          </div>

          <div className="content_information_rigth">
            <p>Wind: {weatherDate.wind.speed} m/c</p>
            <p>Humidity: {weatherDate.main.humidity} %</p>
            <p>Visibility: {weatherDate.visibility} m</p>
          </div>

        </div>
      )}
    </>
  )
}