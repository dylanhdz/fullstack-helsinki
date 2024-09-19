import { useState } from 'react'
const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
    {text}
    </button>
  )
}
const Anecdote = (props) => {
  return(
    <>
      <h1>{props.title}</h1>
        {props.anecdote}
        <p>has {props.votes} votes</p>
    </>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const handleVote = () => {
    const newVotes = {
      ...votes
    }
    newVotes[selected] = newVotes[selected]+1
    if (newVotes[selected] > newVotes[mostVoted]) {
      //console.log('index of most voted:',mostVoted)
      //console.log('votes of most voted:',newVotes[mostVoted])
      setMostVoted(selected)
    }
    setVotes(newVotes)
  }

  const generateRandom = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  return (
    <div>
      <Anecdote title='Anecdote of the day' anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <div>
        <Button text='vote' onClick={handleVote}/>
        <Button text='next anecdote' onClick={generateRandom}/>
      </div>
      <Anecdote title='Anecdote with most votes' anecdote={anecdotes[mostVoted]} votes={votes[mostVoted]}/>
    </div>
  )
}

export default App