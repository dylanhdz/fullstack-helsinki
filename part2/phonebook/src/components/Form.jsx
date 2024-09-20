const Form = ({newName, newNumber, handleNameChange, handleNumberChange, addContact}) => {
    return (
      <form onSubmit={addContact}>
          <h3>add a new</h3>
          <div>
            name: <input value={newName} onChange={handleNameChange}/>
          </div>
          <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }

  export default Form