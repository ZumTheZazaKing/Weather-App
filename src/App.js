import { useState } from 'react';

function App() {

  let [inputCity, setInputCity] = useState("");

  let [cityName, setCityName] = useState("");
  let [country,setCountry] = useState("");
  let [description, setDescription] = useState("");
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
      setDescription(data.weather.description);
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
      <form onSubmit={search}>
        <input type="text" placeholder="Enter city name" value={inputCity} onChange={e => setInputCity(e.target.value)} required/>
        <input type="submit" value="Search"/>
      </form>
      <h1>{cityName},{country}</h1>
      <h2>{description}</h2>
      <h3>{(temp - 273.15).toFixed(0)}{"°C"}</h3>
      <h4>Feels like {(feelTemp - 273.15).toFixed(0)}{"°C"}</h4>
      <br/><br/>
      <p>
        Humidity:{humidity}%<br/><br/>
        Wind Speed:{windSpeed}m/s<br/><br/>
        Wind Direction:{windDirection}<br/><br/>
        Visibility:{visibility}km<br/><br/>
        Sunrise:{sunrise}<br/><br/>
        Sunset:{sunset}<br/><br/>
      </p>
    </div>
  );
}

export default App;
