import React from 'react'
const res=0

const Total = ({course}) =>{
    const total=course.reduce((sum, val)=>sum+val.exercises,0)
    return(
      <div>
        <h3>total of {total} exercises</h3>
      </div>
    );
  }

export default Total