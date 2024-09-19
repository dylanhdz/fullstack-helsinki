//
// Part 1.1: Hello App
//
const Hello = ({name, age}) => {

  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>

      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10
  const friends = [
    { name: 'Dylan', age: 25 },
    { name: 'Mary', age: 50 + 6 },
    { name: 'Luis', age: 2 }
  ]
  return (
    // Los fragmentos '<> </>' permiten agrupar y devolver varios elementos sin necesidad de un div
    <>
      <h1>Greetings</h1>

      <Hello name='Dylan' age={25}/>
      <Hello name='Mary' age={50+6}/>
      <Hello name='Luis'age={2}/>
      <Hello name={name} age={age}/>
      <Hello name={friends[0].name} age={friends[0].age}/>
    </>
  )
}
export default App