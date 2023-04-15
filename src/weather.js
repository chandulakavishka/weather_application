import { useEffect, useState } from "react";
import axios from 'axios';
import SearchImage from "./image/search.png"
import Humidity from "./image/humidity.png"
import Wind from "./image/wind.png"
import Rain from "./image/rain.png"
import Clouds from "./image/clouds.png"
import Clear from "./image/clear.png"
import Drizzle from "./image/drizzle.png"
import Mist from "./image/mist.png"

function Weather() {

  const [checkWeather,setCheckWeather] = useState("")
  const [weatherIconSrc, setWeatherIconSrc] = useState("");

  useEffect(() => {
    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");

    const apiKey = "cb9c2c7a55b2f2f1e2545f8e0ca142c1";
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
    
    axios.get(apiUrl+ checkWeather + `&appid=${apiKey}`)
      .then((data) => {
        document.querySelector(".city").innerHTML = data.data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.data.wind.speed + "Km/h";

        // if(data.response.status === 404){
        //   document.querySelector(".error").style.display = "block";
        // }
        
        if(data.data.weather[0].main === "Clouds"){
          setWeatherIconSrc(Clouds);
        }else if(data.data.weather[0].main === "Clear"){
          setWeatherIconSrc(Clear);
        }else if(data.data.weather[0].main === "Rain"){
          setWeatherIconSrc(Rain);
        }else if(data.data.weather[0].main === "Drizzle"){
          setWeatherIconSrc(Drizzle);
        }else if(data.data.weather[0].main === "Mist"){
          setWeatherIconSrc(Mist);
        }
        
        document.querySelector(".info").style.display = "block";
      })

      searchBtn.addEventListener("click", () => {
        setCheckWeather(searchBox.value);
      })
  }, [checkWeather]);

    return (
      <div className="box">
        <div className="search">
            <input type="text" placeholder="Enter city name" spellCheck="false"></input>
            <button ><img src={SearchImage} alt="search img"></img></button>
        </div>
        <div className="error">
          <p><b>Invalid city name</b></p>
        </div>
        <div className="info">
            <img src={weatherIconSrc} alt="rain icon" className="weather-icon"></img>
            <h1 className="temp">22°c</h1>
            <h1 className="city">New York</h1>
            <div className="details">
                <div className="col">
                    <img src={Humidity} alt="humidity"/>
                    <div>
                       <p className="humidity">50%</p>
                       <p>Humidity</p>
                    </div>
                </div>
                <div className="col">
                    <img src={Wind} alt="wind"/>
                    <div>
                       <p className="wind">15 Km/h</p>
                       <p>Wind Speed</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default Weather;