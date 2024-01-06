import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [country, setCountry] = useState([])
  const [ filterCountry, setfilterCountry] = useState('')

  const CountryInfo = ({country}) => {
    let weather = null;
    console.log(country)
    var languages = Object.values(country[0].languages)
    
    const hook2 = () => {
      const api_key = process.env.REACT_APP_API_KEY
      const q = country[0].capital[0]
      console.log(weather)
      axios({
        method: 'get',
        url: 'https://api.openweathermap.org/data/2.5/weather',
        params: {
          q: q,
          appid: api_key,
          units: 'metric'
        }
      })
      .then(response => {weather = response.data})
    }
    useEffect(hook2, null)

    return(
      <div>
        <h1>{country[0].name.common}</h1>

        <text>
          Capital {country[0].capital[0]} <br />
          Population {country[0].population}
        </text>

        <h2>Languages</h2>

        <ul>
        {languages.map(language => 
          <li key={language}>{language}</li>)}
        </ul>

        <img src={country[0].flags.png} />

        <h2>Weather in {country[0].capital[0]}</h2>

        <text>
          temperature {weather.main.temp} °Celcius <br />
        </text>

      </div>
     )
  }

  const Country = ({country,filterCountry}) =>{
    let result = []
    result=country.filter(country => country.name.common.toLowerCase().includes(filterCountry.toLowerCase()))
    console.log(result)


    if(result.length >= 10){
      return(
          <div>
            Too many matches, specify another filter
          </div>
      )
      }
      else if(result.length<10 && result.length>1){
        return(
          <ul>
            {result.map(country => 
              <li key={country.name.common}>{country.name.common} <button onClick={() => setfilterCountry(country.name.common)}> show
            </button></li>)} 
          </ul>
        )

      }
      else if (result.length==1){
        return(
          <CountryInfo country={result} />
      )}
  }

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/independent?status=true')
      .then(response => {
        setCountry(response.data)
      })
  }
  useEffect(hook, [])


  const handleFilterCountry = (event) => {
    setfilterCountry(event.target.value)
  }
  return(
  <div>

    find countries <input value={filterCountry} onChange={handleFilterCountry}/>
  
    <Country country={country} filterCountry={filterCountry}/>
  
  </div>
  )
}

export default App;
