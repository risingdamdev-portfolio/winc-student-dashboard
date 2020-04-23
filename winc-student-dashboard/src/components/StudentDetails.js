import React from 'react'

import Students from '../data/students.json'
import Metadata from '../data/metadata.json'

const StudentDetails = props => {
    const {id} = props

    const students = parseStudents()
    let student = students.find(student => {
        return student.id === parseInt(id)
    })
    const metadata = parseMetadata()
    let studentData = metadata.find(row => {
        return student.id === parseInt(row.id)
    })

    let tableData = []
    let keyID = 0
    let lastName = ''
    for (let [key, value] of Object.entries(studentData)) {
        keyID++
        const label = key.charAt(0).toUpperCase() + key.slice(1)
        if (key === 'name') {
            tableData.push(
                <tr key={keyID}>
                    <td>Name</td>
                    <td>
                        {student.name} {value}
                    </td>
                </tr>
            )
            lastName = value
        } else if (key === 'email') {
            tableData.push(
                <tr key={keyID}>
                    <td>{label}</td>
                    <td>
                        <a href={`mailto:${value}`}>{value}</a>
                    </td>
                </tr>
            )
        } else if (key === 'avatar') {
            tableData.push(
                <tr key={keyID}>
                    <td>{label}</td>
                    <td>
                        <img
                            className='avatar'
                            src={value}
                            width='80'
                            height='80'
                            alt={student.name}
                        />
                    </td>
                </tr>
            )
        } else if (key !== 'id') {
            tableData.push(
                <tr key={keyID}>
                    <td>{label}</td>
                    <td>{value}</td>
                </tr>
            )
        }
    }

    return (
        <main>
            <header>
                <h1>
                    {student.name} {lastName}
                </h1>
            </header>
            <table>
                <tbody>{tableData}</tbody>
            </table>
        </main>
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

const parseMetadata = () => {
    return Metadata
}

export default StudentDetails
