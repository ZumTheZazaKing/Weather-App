import { useState } from 'react';
import humidityImage from './images/humidity.png';
import windSpeedImage from './images/wind.png';
import compass from './images/compass.png';
import binoculars from './images/binoculars.png';
import sunriseImage from './images/sunrise.png';
import sunsetImage from './images/sunset.png';

function App() {

  let [inputCity, setInputCity] = useState("");

  let [cityName, setCityName] = useState("");
  let [country,setCountry] = useState("");
  let [description, setDescription] = useState("");
  let [weatherIcon, setWeatherIcon] = useState("");
  let [temp, setTemp] = useState("");
  let [feelTemp, setFeelTemp] = useState("");

  let [humidity, setHumidity] = useState("");
  let [windSpeed, setWindSpeed] = useState("");
  let [windDirection, setWindDirection] = useState("");
  let [visibility, setVisibility] = useState("");
  let [sunrise, setSunrise] = useState("");
  let [sunset, setSunset] = useState("");

  const search = e => {
    e.preventDefault();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=78917f7c092b0c1fe155b704af021ffb`)
    .then(res => res.json())
    .then(data => {
      setCityName(data.name);
      setCountry(data.sys.country);
      setDescription(data.weather[0].description);
      setWeatherIcon("http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
      setTemp(data.main.temp);
      setFeelTemp(data.main.feels_like);

      setHumidity(data.main.humidity);
      setWindSpeed(data.wind.speed);
      setWindDirection(data.wind.deg);
      setVisibility(data.visibility/1000);

      const sunriseObject = new Date(parseInt(data.sys.sunrise) * 1000);
      const sunsetObject = new Date(parseInt(data.sys.sunset) * 1000);

      let sunriseHours = sunriseObject.getHours();
      if(sunriseHours < 10)sunriseHours = "0" + sunriseHours;
      let sunriseMinutes = sunriseObject.getMinutes();
      if(sunriseMinutes <  10)sunriseMinutes = "0" + sunriseMinutes;

      let sunsetHours = sunsetObject.getHours();
      if(sunsetHours < 10)sunsetHours = "0" + sunsetHours;
      let sunsetMinutes = sunsetObject.getMinutes();
      if(sunsetMinutes < 10)sunsetMinutes = "0" + sunsetMinutes;

      setSunrise(sunriseHours + ":" + sunriseMinutes);
      setSunset(sunsetHours + ":" + sunsetMinutes);

    })
    .catch(err => alert(`An Error Occured:\n ${err}`))

  }


  return (
    <div className="App">
      <div id="LeftSide">
        <h1>{cityName}, {country}</h1>
        <h2>{description}</h2>
        <img src={weatherIcon} alt="" width="100" height="100"/>
        <p id="temp">{(temp - 273.15).toFixed(0)}{"°C"}</p>
        <h4>Feels like {(feelTemp - 273.15).toFixed(0)}{"°C"}</h4>
      </div>
      <div id="RightSide">
        <form onSubmit={search}>
          <input type="text" placeholder="Enter city name" value={inputCity} onChange={e => setInputCity(e.target.value)} required/>
        </form>
        <br/>
        <div id="info">
          <div>Humidity: <br/>{humidity}%<img src={humidityImage} alt="" width="50" height="50"/></div>
          <div>Wind Speed: <br/>{windSpeed} m/s<img src={windSpeedImage} alt="" width="50" height="50"/></div>
          <div>Wind Direction: <br/>{windDirection}°<img src={compass} alt="" width="50" height="50"/></div>
          <div>Visibility: <br/>{visibility} km<img src={binoculars} alt="" width="50" height="50"/></div>
          <div>Sunrise: <br/>{sunrise}<img src={sunriseImage} alt="" width="50" height="50"/></div>
          <div>Sunset: <br/>{sunset}<img src={sunsetImage} alt="" width="50" height="50"/></div>
        </div>
        <h6>ZUMTHEZAZAKING &copy;2021</h6>
      </div>
    </div>
  );
}

export default App;
