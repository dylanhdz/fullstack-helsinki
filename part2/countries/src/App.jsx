import { useState, useEffect } from 'react'
import axios from 'axios'
import Description from './description.json'

const App = () => {
  const [filter, setFilter] = useState('')
  const [focusedCountry, setFocusedCountry] = useState(null)
  const [focusedTemperature, setFocusedTemperature] = useState(null)
  const [countries, setCountries] = useState({})
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    console.log('effect run, recovered countries')

      console.log('fetching countries...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountries(response.data.map(country => country.name.common))
        })
  }, [])

  
  useEffect(() => {
    console.log('effect run, country is now', filteredCountries)

    if (filter) {
      console.log('fetching countries...')
      const filteredCountries = countries.filter(country => country.toLowerCase().includes(filter.toLowerCase()))
      setFilteredCountries(filteredCountries)
    }
  }, [filter])

  useEffect(() => {
    if (filteredCountries.length === 1) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${filteredCountries[0]}`)
        .then(response => {
          setFocusedCountry(response.data)
        })
    }
    else setFocusedCountry(null) 
  }, [filteredCountries])

  useEffect(() => {
    if (focusedCountry!=null) {
      axios
    .get(`https://api.open-meteo.com/v1/forecast?latitude=${focusedCountry.capitalInfo.latlng[0]}&longitude=${focusedCountry.capitalInfo.latlng[1]}&current=temperature_2m,weather_code,wind_speed_10m&wind_speed_unit=ms&forecast_days=1`)
    .then(response => {
      setFocusedTemperature(response.data.current)
    })
    }
    else setFocusedTemperature(null)
  }, [focusedCountry])

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  const handleCountryShow = (country) => {
    setFilter(country)
  }
  
  const WeatherInfo = ({capital, temperature, wind}) => {

    const numeric_code = focusedTemperature.weather_code
    const isDay = focusedTemperature.is_day
    let weather_code = 0
    if (isDay) {
      weather_code = Description[numeric_code].day.image
    }
    else weather_code = Description[numeric_code].night.image

    return (
      <>
        <h2>temperature in {capital}</h2>
        <p>temperature {temperature} ° Celsius</p>
        <img src={weather_code}></img>
        <p>wind {wind} m/s</p>
      </>
    )
  }

  const CountryInfo = ({name, capital, area, languages, flag}) => {

    return focusedTemperature && (
      <>
        <h1>{name}</h1>
        <p>capital {capital}</p>
        <p>area {area}</p>
        <p><b>languages:</b></p>
        {Object.values(languages).map(language => <ul key={language}>{language}</ul>)}
        <img src={flag}></img>
        <WeatherInfo capital={capital} temperature={focusedTemperature.temperature_2m} wind={focusedTemperature.wind_speed_10m} />
      </>
    )
  }

  const Information = ({filteredCountries}) => {
    if (filteredCountries.length > 10) {
      return (
        <>
          <p>Too many matches, specify another filter.</p>
        </>
      )
    }
    else if (filteredCountries.length < 10 && filteredCountries.length > 1) {
      return (
        <>
          {filteredCountries.map(country => <p key={country}>{country} <button onClick={() => handleCountryShow(country)}>show</button></p>)}
        </>
      )
    }
    else if (filteredCountries.length === 1 && focusedCountry) {
      return (
        <CountryInfo name={focusedCountry.name.common} capital={focusedCountry.capital} area={focusedCountry.area} languages={focusedCountry.languages} flag={focusedCountry.flags.png}/>
      )
    }
  }

  return (
    <div>
        find countries <input value={filter} onChange={handleChange} />
        <Information filteredCountries={filteredCountries}/>
    </div>
  )
}

export default App