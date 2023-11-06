import { useState, useEffect } from 'react'
// import './App.css'

function App() {
const [input, setInput] = useState("") ;
const [weatherData, setWeatherData] = useState(null);
const [isSubmitted, setIsSubmitted] = useState(false);




  async function FetchData() {
    try {
   let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=dd5a7f96f300e094900a69a54cca2914`) ;
   let data = await res.json() ;
   setWeatherData(data) ;
   console.log(data) ;
   setIsSubmitted(true);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
useEffect(() => { 
if(input && !isSubmitted) {
  FetchData() ;
}
}
 , [ isSubmitted]);



 return (
  <div>
    {!isSubmitted && (
      <>
        <input onChange={(e) => setInput(e.target.value)} />
        <button onClick={FetchData}>Submit</button>
      </>
    )}

    {isSubmitted && weatherData && (
      <div>
        <h2>Name: {weatherData.name}, {weatherData.sys.country}</h2>
        <p>Temperature: {weatherData.main.temp}°C</p>
        <p>Main: {weatherData.weather[0].main}</p>
        <p>Description: {weatherData.weather[0].description}</p>
        {/* Add more weather details as needed */}
      </div>
    )}
  </div>
);
}

export default App;
