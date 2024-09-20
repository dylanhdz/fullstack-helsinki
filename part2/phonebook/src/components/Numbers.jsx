const Numbers = ({filteredPersons}) => {
    return (
      <>
        <h3>Numbers</h3>
        {filteredPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
      </>
    )
  }
export default Numbers