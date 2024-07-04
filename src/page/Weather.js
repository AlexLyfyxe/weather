import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function Weather() {

    const [city, setCity] = useState('');
    const [weatherDate, setWeatherDate] = useState(null);

    const [error, setError] = useState(null);

    const [time, setTime] = useState('');

    const WWW = 'https://api.openweathermap.org/data/2.5/weather';
    const APIKEY = '25fa81762c3215a26b2b8277f4a2c9ad';


    const getWeather = async () => {
        if (!city) {
            setError('Please specify the city correctly');
            setWeatherDate(null)
            return
        }

        try {
            setWeatherDate(null);
            const response = await axios.get(`${WWW}?q=${city}&units=metric&appid=${APIKEY}`);
            setWeatherDate(response.data)
            setError(null)
        } catch (error) {
            setError('Please specify the city correctly');
            console.error(error)
        }
    }




    const formatLocalTime = (timezone) => {
        const localDate = new Date(Date.now() + timezone * 1000);
        return localDate.toUTCString().slice(-12, -4);
    };


    useEffect(() => {
        let timer;
        if (weatherDate) {
            timer = setInterval(() => {
                setTime(formatLocalTime(weatherDate.timezone))
            }, 1000);
        }

        return () => clearInterval(timer)
    }, [weatherDate])



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
                        <h2>{weatherDate.name} / {weatherDate.sys.country}</h2>
                        <p className="temp">{weatherDate.main.temp}°</p>


                        <div> <span>{weatherDate.weather[0].main}</span>
                            {weatherDate.weather[0].icon && (
                                <img src={`https://openweathermap.org/img/w/${weatherDate.weather[0].icon}.png`} alt={weatherDate.weather[0].description} />
                            )}
                        </div>
                        <p className="time">Time: {time}</p>
                    </div>

                    <div className="content_information_rigth">
                        <p><span>Wind:</span> {weatherDate.wind.speed} m/c</p>
                        <p><span>Humidity:</span> {weatherDate.main.humidity} %</p>
                        <p><span>Visibility:</span> {weatherDate.visibility} m</p>
                        <p><span>Sea Level:</span> {weatherDate.main.sea_level} m</p>
                    </div>

                </div>
            )}
        </>
    )
}