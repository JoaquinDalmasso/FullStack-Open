import { toBeValid } from '@testing-library/jest-dom/matchers'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = props => <h1>{props.name}</h1>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => {
  if (text==="positive"){
    return(
      <tr>
        <td>{text}</td> 
        <td>{value} %</td>
      </tr>
    )
  }
  return(
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const Statistics =(props) => {
  const all = props.good+props.bad+props.neutral
  const average = (props.good-props.bad)/(props.good+props.bad+props.neutral)
  const positive = (props.good/(props.good+props.bad+props.neutral))*100

  if (props.good==0 && props.bad==0 && props.neutral==0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text='good' value={props.good} />
          <StatisticLine text='neutral' value={props.neutral} />
          <StatisticLine text='bad' value={props.bad} />
          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={positive} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () =>{
    setGood(good + 1)
  }
  const handleNeutralClick = () =>{
    setNeutral(neutral + 1)
  } 
  const handleBadClick = () =>{
    setBad(bad + 1)
  } 

  return (
    <div>
      <Header name="give feedback"/>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <Header name="statistics"/>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)