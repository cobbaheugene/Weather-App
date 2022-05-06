import React, { useState } from 'react';



const api = {
  key: '8ce9e4665b539ad3d8a0657d4a9cd207',
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }
   

   let d = new Date(); 
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
   
    let time = d.toLocaleString([],{
      hour: '2-digit' ,
      minute: '2-digit' ,
      
    })

  function  capitalizeFirstLetter(string){
     return string.charAt(0).toUpperCase() + string.slice(1);
  }




  return (
    <div className={
      (typeof weather.main == 'undefined') ? 'App'
      :(weather.main.temp < 16 && weather.weather[0].main != 'Rain' && weather.weather[0].main != 'Thunderstorm' && weather.weather[0].main != 'Drizzle') ? 'App cold'
      :(weather.weather[0].main == 'Rain' || weather.weather[0].main == 'Thunderstorm') ? 'App rain'
      :(weather.weather[0].main == 'Drizzle') ? 'App drizzle'
      :(weather.weather[0].main == 'Clouds') ? 'App cloud'
      :(weather.weather[0].main == 'Dust' && weather.weather[0].main != 'Haze') ? 'App dust'
      :(weather.weather[0].main == 'Mist') ? 'App mist'
      :'App'}>
      
      <main>
        <div className ='big'>
        
          <div className='search-box'>
              <input 
            type="text"
            className="search-bar"
            placeholder="Enter a city or country"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
             />
           </div>
        </div>
        

        {(typeof weather.main != 'undefined')? (
          <div className= "Organise">
          <div className="location-box">
            <div className="date">
            <h4>{time} </h4>
            <br/>
           
            {day}, {date} {month}, {year}
           
            </div>
            <div className="location">{weather.name}, {weather.sys.country}</div>
            
          </div>
         
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°C

            </div>
            <div className= "description">{capitalizeFirstLetter(weather.weather[0].description)}</div>
            <div className= "box">
              
              <div className= "pressure"><h5>{weather.main.pressure} hPa</h5><br/>Pressure</div>
              <div className= "humidity"><h5>{weather.main.humidity} %</h5> <br/>Humidity</div>
              <div className="speed"><h5>{weather.wind.speed} m/s</h5><br/>Windspeed</div>
            </div>
              
          </div>
         
        </div>
        ) : ('')}
       
      </main>
      
    </div>
  );
}












export default App;
