import React from 'react'

import Students from '../data/students.json'
import Metadata from '../data/metadata.json'

const RenderTable = props => {
    let students = parseStudents()
    let student = props.student
    let currentUser = ''
    const selectItems = students.map(row => {
        if (student !== undefined && student.username === row.username) {
            currentUser = row.username
        }
        return (
            <option key={row.id} id={row.id} value={row.username}>
                {row.name}
            </option>
        )
    })
    return (
        <p>
            Filter by student:{' '}
            <select defaultValue={currentUser}>{selectItems}</select>
        </p>
    )
}

const parseStudents = () => {
    let studentNames = []
    let studentID = 1
    Students.forEach(row => {
        if (
            studentNames.findIndex(index => index.username === row.username) ===
            -1
        ) {
            studentNames.push({
                id: studentID,
                name: row.username,
                username: row.username
            })
            studentID++
        }
    })

    return studentNames.map(row => {
        return {
            id: row.id,
            name: row.name,
            username: row.username.toLowerCase()
        }
    })
}

export default RenderTable
