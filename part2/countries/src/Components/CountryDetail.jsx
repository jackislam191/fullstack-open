import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDetail = ({country}) => {
    // console.log(import.meta.env.VITE_WEATHER_API_KEY); // https://vitejs.dev/guide/env-and-mode.html
    //https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}  try this example before you use
    const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${WEATHER_API_KEY}`;
    const [weather, setWeather] = useState(null);
    const [weatherIcon, setWeatherIcon] = useState('')
    const [temperature, setTemperature] = useState('')
    const [windSpeed, setWindSpeed] = useState('')
    useEffect(() => {
        axios.get(url)
        .then((response) => {
            setWeatherIcon(response.data['weather'][0]['icon']);
            setTemperature(response.data['main']['temp']);
            setWindSpeed(response.data['wind']['speed']);
        })
    }, [url]);
    return (
        <div>
            <h1>{country.name.common}</h1>
              <p>capital {country.capital}</p>
              <p>area {country.area}</p>

              <h3>languages:</h3>
              <ul>
                {Object.values(country.languages).map((lang) => (
                  <li key={lang}>{lang}</li>
                ))}
              </ul>
              <img src={country.flags['png']} alt={country.flags['alt']}></img>
              <h3>Weather in {country.capital}</h3>
              <p>temperature {temperature} Kelvin</p>
              <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} ></img>
               <p>wind {windSpeed} m/s</p>
        </div>
    );
}

export default CountryDetail;
