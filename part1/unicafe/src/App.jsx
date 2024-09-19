import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, all}) => {
  if (all == 0) {
    return (
      <>
      <h1>statistics</h1>
      <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
        <StatisticLine text='good' value={good}/>
        <StatisticLine text='neutral' value={neutral}/>
        <StatisticLine text='bad' value={bad}/>
        <StatisticLine text='all' value={all}/>
        <StatisticLine text='average' value={all !=0 ? ((good*1+neutral*0+bad*(-1))/all) : 0}/>
        <StatisticLine text='positive' value={all !=0 ? (((good/all)*100)+' %') : 0}/>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    setGood(good+1);
    setAll(all+1)
  }
  const handleNeutral = () => {
    setNeutral(neutral+1);
    setAll(all+1)
  }
  const handleBad = () => {
    setBad(bad+1);
    setAll(all+1)
  }

  return (
    <div>
      <h1>give feedback</h1>
        <Button onClick={handleGood} text='good'/>
        <Button onClick={handleNeutral} text='neutral'/>
        <Button onClick={handleBad} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad} all ={all}/>
    </div>
  )
}

export default App