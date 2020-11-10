import React, { useEffect, useState } from 'react'
import './App.css';
import Header from './Header'
import RightSingleCol from './RightSingleColumn'
import Error from './Error'
import Forecast from './ForeCast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
} from '@fortawesome/free-solid-svg-icons';


const API_KEY = "e91ee1821027c9197f6e8446bc5ff377"

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'Nocvember',
  'December',
];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const currentDate = new Date();
const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]
  }`;

function App() {
  const [city, setCity] = useState("");
  const [response, setResponse] = useState("");
  const [forecast, setForecast] = useState([]);

  function handleCity(e) {
    e.preventDefault();
    setCity(e.target.value);
  }
  function formSubmit(e) {
    e.preventDefault();
    function fetchData() {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
        .then(response => {
          if (response.status === 200) {
            return response.json()
          }
          else {
            <Error />
          }
        }
        )
        .then(response => setResponse(response))
        .catch(error => console.log(error))
    }
    function fetchDataForecast() {
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}&units=metric`)
        .then(response => {
          if (response.status === 200) {
            return response.json()
          }
          else {
            <Error />
          }
        }
        )
        .then(response => setForecast(response.list))
        .catch(error => console.log(error))
    }
    fetchDataForecast();
    fetchData();
  }
  console.log(forecast)

  return (
    <div className="App">
      <Header />
      <div className="search_box">
        <div className="row py-5 px-0 mx-0">
          <div className="col-12 col-md-6 mx-auto">
            <form onSubmit={formSubmit}>
              <div class="form-group has-search">
                <span class="fa fa-search form-control-feedback"></span>
                <input type="text" class="form-control" value={city} placeholder="Enter city name and press enter..." onChange={handleCity} />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="row mx-0 px-0 px-4">
        <div className="col-12">
          {
            response ?
              <>
                <div className="row body">
                  <div className="col-12 col-md-6">
                    <h1>{response.name}, {response.sys.country}</h1>
                    <p>{date}</p>
                    <div className="d-flex align-items-center py-4">
                      <h1 className="header_icon">
                        {
                          response.weather[0].main === "Clear" ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faSmog} />
                        }
                      </h1>
                      <div className="px-5">
                        <h1>{Math.floor(response.main.temp_max - 273.15)}<span>&#176;</span></h1>
                        <p>{response.weather[0].main}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 right_div">
                    <div className="row justify-content-between">
                      <RightSingleCol main={`${Math.floor(response.main.temp_max - 273.15)}`} title="Highest" span={true} />
                      <RightSingleCol main={`${response.wind.speed} mph`} title="Wind Speed" />
                      <RightSingleCol main={`${new Date(response.sys.sunset * 1000).toLocaleTimeString().slice(0, 4)} AM`} title="sunset" />
                      <RightSingleCol main={`${Math.floor(response.main.temp_min - 273.15)}`} title="Lowest" span={true} />
                      <RightSingleCol main={`${response.wind.deg}`} title="Wind Degree" span={true} />
                      <RightSingleCol main={`${new Date(response.sys.sunrise * 1000).toLocaleTimeString().slice(0, 4)} PM`} title="sunset" />
                    </div>
                  </div>
                </div>
                <Forecast data={forecast} />
              </>
              : <Error />
          }
        </div>
      </div>
    </div>
  );
}

export default App;
