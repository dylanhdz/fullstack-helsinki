import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import Form from './components/Form'
import Numbers from './components/Numbers'
import Confirmation from './components/Confirmation'
import Error from './components/Error'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [confirmationMessage, setConfirmationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(
        persons => {
          setPersons(persons)
        }
      )
  }
  useEffect(hook,[])
  console.log('render', persons.length, 'persons')

  const addContact = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
      //id: String(persons.length + 1)
    }
    let foundPerson = persons.find(person => person.name === newName)
    // No promises code
    //foundPerson === undefined ? setPersons(persons.concat(personObject)) : alert(`${newName} is already added to phonebook.`)
    foundPerson === undefined ?
    personService
      .create(personObject)
      .then(personsNew => {
        setPersons(persons.concat(personsNew))
        setConfirmationMessage(`Added ${personsNew.name}`)
        setTimeout(() => {
          setConfirmationMessage(null)
        },5000)
      })
      .catch(error => {
        const message = error.response.data.error
        const lastIndexColon = message.lastIndexOf(':')
        setErrorMessage(`Error: ${message.substring(lastIndexColon+1)}`)
      })
      //: alert(`${newName} is already added to phonebook.`) 
      : 
    personService
      .update(foundPerson.id, personObject)
      .then(responsePerson => {
        setPersons(persons.map(person => person.id !== foundPerson.id ? person : responsePerson))
      })
      .catch(error => {
        setErrorMessage(`Information of ${foundPerson.name} has already been deleted from the server.`)
        setTimeout(() => {
          setErrorMessage(null)
        },5000)
      })
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleDeletionOf = (id) => {
    const person = persons.find(person => person.id === id)
    window.confirm('Delete '+ person.name +'?') ? 
    personService
      .deletePerson(id)
      .then(returnedData => {
        console.log(returnedData)
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        alert(
          `the person '${person.name}' was already deleted from server`
        )
      }) : {}

  }
  //console.log(filteredPersons)
  //{filteredPersons.map(person => <p key={person.name}>{person.name} {person.number} <button onClick={() => handleDeletionOf(person.id)}>delete</button></p> )}

  return (
    <div>
      <h2>Phonebook</h2>
      <Confirmation message={confirmationMessage}/>
      <Error message={errorMessage}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <Form newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addContact={addContact}/>
      <Numbers filteredPersons={filteredPersons} handleDeletion={handleDeletionOf}/>
    </div>
  )
}

export default App