import React from "react"

const Persons = ({persons,filterName, deletePerson}) =>{
    let result = []
    if(!filterName){
      result=persons
      }
      else{
      result=persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
      }
  
    return(
    <ul>
    {result.map(person => 
      <li key={person.name}>{person.name} {person.number}  <button onClick={()=>deletePerson(person.id)}>delete</button></li>)}
    </ul>
    )
  }

export default Persons

