import React from 'react'
import {useParams} from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import {HOME_URL} from '../Config'

const Student = props => {
    const {username, id} = useParams()
    const {studentNames, metadata} = props

    if (studentNames === []) {
        return ''
    }
    let student = studentNames.find(student => {
        return student.id === parseInt(id)
    })

    let studentData = metadata.find(row => {
        return student.id === parseInt(row.id)
    })

    if (studentData === undefined) {
        return ''
    }

    console.log(username, studentData)

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
                            src={`/avatar/${value}`}
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

    let urlToStudent = ''
    if (student !== undefined) {
        urlToStudent = (
            <li>
                <a
                    className='active'
                    href={`${HOME_URL}/id/${student.id}/username/${student.username}`}
                >
                    {student.name}
                </a>
            </li>
        )
    }

    return (
        <React.Fragment>
            <Nav
                nav='Student'
                id={id}
                username={username}
                urlToStudent={urlToStudent}
            />
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
            <Footer />
        </React.Fragment>
    )
}

export default Student
