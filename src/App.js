import coldBg from "./assets/cold.jpg";
import hotBg from "./assets/hot.jpg";
import './App.css';
import Description from "./Components/Description";
import { useEffect, useState } from "react";
import { getWeatherData}  from "./WeatherData";

function App() {
  const [ weather,setWeather]=useState(null);
  const [units, setUnits] = useState("metric");
  const [city,setCity]=useState("Delhi");
  const [bg,setBg]=useState(hotBg);
  
  useEffect(()=>{
    const fetchWeatherData = async()=>{
      const data = await getWeatherData(city,units);
      setWeather(data);
      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(coldBg);
      else setBg(hotBg);
    }
     fetchWeatherData();
  },[city,units])

  const handleUnits= (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };
  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };
 
  console.log(weather);
  return (
    <div className="App" style={{ backgroundImage: `url(${bg})`,width:'100%',height:'100vh',backgroundPosition:'center',backgroundSize:'cover' }}>
      <div className="overlay">
        {weather && (
           <div className="container">
           <div className='section section__inputs'>
             <input  onKeyDown={enterKeyPressed} type="text" name="city" placeholder='Enter City...'/>
             <button  onClick={(e)=>handleUnits(e)}>°F</button>
           </div>
           <div className="section section__temperature">
             <div className="icon">
               <h3>{weather.name}</h3>
               <img src={weather.iconURL} alt=""/>
               <h3>{weather.description}</h3>
             </div>
             <div className="temperature">
               <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
             </div>
           </div>
 
           <Description weather={weather} units={units}/>
           </div>
        )}
      </div>
    </div>
  );
}

export default App;
