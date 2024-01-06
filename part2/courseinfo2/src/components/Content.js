import React from "react"

const Content = ({course}) => {
    return(
    course.parts.map(courses => <p key={courses.id}>{courses.name} {courses.exercises}</p>)
    )
}

export default Content