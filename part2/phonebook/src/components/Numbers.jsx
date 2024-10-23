const Numbers = ({filteredPersons, handleDeletion}) => {
    return (
      <>
        <h3>Numbers</h3>
        {filteredPersons.map(person => <p key={person.name}>{person.name} {person.number} <button onClick={() => handleDeletion(person.id)}>delete</button></p> )}
        
      </>
    )
  }
export default Numbers