import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import personsService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setfilterName ] = useState('')
  const [message, setMessage] = useState(null)
  

  const hook = () => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }
  
  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber
    }

    const nameExists = persons.some(person => person.name === newName)

    if (nameExists === true){
      const updateNumber = window.confirm(`${persons.find((person) => person.name == newName).name} is already added to phonebook, replace the old number with a new one?`)
      const id = persons.find((person) => person.name === newName).id
      if(updateNumber){
        personsService
        .update(id,noteObject)
        .then(returnedPersons => {
          setPersons(persons.map(person =>
            person.id === id ? returnedPersons : person
          ))
          setMessage(
            `Updated ${newName}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error)
          setMessage(
            `Information of ${newName} has already been removed from server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
      }
      
    } else {
      personsService
      .create(noteObject)
      .then(returnedPersons => {
        setPersons(persons.concat(returnedPersons))
        setMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const isDelete = window.confirm(`Delete ${persons.find((person) => person.id == id).name} ?`)
    if(isDelete){
      personsService
      .deleteOne(id)
      setPersons(persons.filter(person => person.id !== id))
    }
  }
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterPerson = (event) => {
    setfilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message}/>

      <Filter value={filterName} onChange={handleFilterPerson} />

      <h3>Add a new</h3>

      <PersonForm onSubmit={addName} value1={newName} value2={newNumber} onChange1={handlePersonChange} onChange2={handleNumberChange} />

      <h3>Numbers</h3>
      <ul>
      <Persons persons={persons} filterName={filterName} deletePerson={deletePerson}/>
      </ul>
    </div>
  )
}

export default App;
