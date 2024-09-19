// Part 1.2: Counter App
// Rendering is the process of converting React components into DOM (Document Object Model) nodes
// that the browser can understand and display on the screen.
// It occurs on the main.jsx file
import { useState } from 'react'
const Display = ({counter}) => <div>{counter}</div>
const Button = ({onSmash, text}) => <button onClick={onSmash}>{text}</button>
// This is equivalent to the longer form:
/*const Button = (props) => {
  return (
    <button onClick={props.onSmash}>
      {props.text}
    </button>
  )
}*/
const App = () => {

  const [ counter, setCounter ] = useState(0)
  console.log('rendering with counter value...', counter)
  // We can define the function earlier
  /*const handleClick = () => {
    setCounter(counter + 1)
  }*/
  // Or we can define the function directly in the onClick event
  const increaseByOne = () => {console.log('+, value before', counter); setCounter(counter + 1)}
  const decreaseByOne = () => {console.log('-, value before', counter); setCounter(counter - 1)}
  const setToZero = () => {console.log('0, value before', counter); setCounter(0)}

  return (
    <div>
      <Display counter={counter}/>
      <Button onSmash={increaseByOne} text='plus'/>
      <Button onSmash={setToZero} text='zero'/>
      <Button onSmash={decreaseByOne} text='minus'/>
    </div>
  )
}

export default App
