import React, { useState, useEffect  } from 'react';
import './App.css';
import App_bar from './Components/AppBar';
import DateButtons from './Components/DateButtons';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hourlyData, setHourlyData] = useState(null);
  const [selectedCity, setSelectedCity] = useState('Kosice'); // Set default city
  const [cityTimezoneOffset, setCityTimezoneOffset] = useState(0);
  const [cityTimezoneOffsets, setCityTimezoneOffsets] = useState({});

  // Function to handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Function to generate dates for the next seven days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      dates.push(nextDate);
    }
    return dates;
  };

  // Generate dates for the buttons
  const dates = generateDates();

  //get API response from back
  useEffect(() => {
  // Fetch data from Spring @GetMapping endpoint
  fetch(`http://localhost:8000/api/v1/meteo/place/${selectedCity}/meteodata`)
    .then(response => response.json())
    .then(data => {
      // Set the retrieved hourly data to state
      setHourlyData(data.hourly);
    })
    .catch(error => {
      console.error('Error fetching hourly data:', error);
    });
  }, [selectedCity, selectedDate]); // Add selectedDate to the dependency array


  //city time offset mapping
  useEffect(() => {
    fetch('/resources/static/places.txt')
      .then(response => response.text())
      .then(data => {
        const lines = data.split('\n');
        const offsets = {};
        lines.forEach(line => {
          const columns = line.split(',');
          offsets[columns[0].trim()] = parseInt(columns[3].trim());
        });
        setCityTimezoneOffsets(offsets);
  
        // Set the selected city
        if (offsets[selectedCity]) {
          setCityTimezoneOffset(offsets[selectedCity]);
        } else {
          console.error(`No timezone offset found for city: ${selectedCity}`);
        }
      })
      .catch(error => {
        console.error('Error fetching city timezone offsets:', error);
      });
  }, [selectedCity]);

  const getCurrentTimeInCity = () => {
    const cityTime = new Date();
    cityTime.setHours(cityTime.getHours() + cityTimezoneOffset);
    return cityTime.getHours();
  };

  // Function to filter hourly data based on selected date
  const filterHourlyData = () => {
    if (!hourlyData) return null;
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const filteredTime = hourlyData.time.filter(time => time.startsWith(formattedDate));
    const startIndex = hourlyData.time.indexOf(filteredTime[0]);
    const endIndex = hourlyData.time.lastIndexOf(filteredTime[filteredTime.length - 1]) + 1;
    return {
      time: hourlyData.time.slice(startIndex, endIndex),
      temperature_2m: hourlyData.temperature_2m.slice(startIndex, endIndex),
      relative_humidity_2m: hourlyData.relative_humidity_2m.slice(startIndex, endIndex),
      precipitation: hourlyData.precipitation.slice(startIndex, endIndex),
      wind_speed_10m: hourlyData.wind_speed_10m.slice(startIndex, endIndex)
    };
  };

  // Filter hourly data based on selected date
  const filteredHourlyData = filterHourlyData();
  const currentTimeInCity = getCurrentTimeInCity();

  const handleCitySelect = (city) => {
    setSelectedCity(city); // Update selected city
  };

  return (
    <div className={`App ${currentTimeInCity >= 19 || currentTimeInCity < 6 ? 'night' : 'day'}`}>
      <App_bar onCitySelect={handleCitySelect}/>
      <div><h1>{selectedCity}</h1></div>
      <div className="currentWeatherContainer">
      {hourlyData ? (
            <div>
            <h1>{hourlyData.temperature_2m[currentTimeInCity]}°C</h1>
            <p>
              w:{hourlyData.wind_speed_10m[currentTimeInCity]} | 
              P:{hourlyData.precipitation[currentTimeInCity]} | 
              h:{hourlyData.relative_humidity_2m[currentTimeInCity]}
             </p>
            </div>
          ) : (
            <p>Loading current weather data...</p>
          )}
        </div>
      <div><h3> Date: {selectedDate.toLocaleDateString('en-US')}: </h3></div>
      <h1>Hourly Weather Data</h1>
      <div className='forecastData'>
        {filteredHourlyData ? (
          <table className='dataElements'>
            <thead>
              <tr>
                <th>Time</th>
                <th>Temperature (°C)</th>
                <th>Relative Humidity (%)</th>
                <th>Precipitation (mm)</th>
                <th>Wind Speed (km/h)</th>
              </tr>
            </thead>
            <tbody>
              {filteredHourlyData.time.map((time, index) => (
                <tr key={index}>
                  <td>{new Date(time).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</td>
                  <td>{filteredHourlyData.temperature_2m[index]}</td>
                  <td>{filteredHourlyData.relative_humidity_2m[index]}</td>
                  <td>{filteredHourlyData.precipitation[index]}</td>
                  <td>{filteredHourlyData.wind_speed_10m[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available for the selected date.</p>
        )}
      </div>
      <div>
      <DateButtons dates={dates} handleDateChange={handleDateChange} selectedDate={selectedDate} />
      </div>
    </div>
  );
}

export default App;
