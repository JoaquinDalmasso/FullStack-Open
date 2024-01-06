import React from 'react'
import Header from './Header'
import Total from './Total'
import Content from './Content'

const Course = ({course}) => {
    return (    
        <div> 
            {course.map(courses => 
                <div key={courses.id}>
                <Header course={courses}/>
                <Content course={courses}/>
                <Total course={courses.parts}/>
                </div>
            )
        }
        </div>
    )
}
 

export default Course