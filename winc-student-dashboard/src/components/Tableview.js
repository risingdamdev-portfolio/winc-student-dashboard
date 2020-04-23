import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams
} from 'react-router-dom'

import Nav from './Nav'
import Footer from './Footer'
import RenderTable from './RenderTable'

import {HOME_URL, HOME_LABEL, STORE_URL, STORE_LABEL} from '../Config'

import Students from '../data/students.json'
import Metadata from '../data/metadata.json'

const Tableview = () => {
    const params = useParams()
    const students = parseStudents()
    let student = students.find(student => {
        return student.username === params.username
    })

    let urlToStudent = ''
    if (params.id !== undefined && student !== undefined) {
        urlToStudent = (
            <li>
                <Link
                    to={`${HOME_URL}/id/${params.id}/username/${params.username}`}
                >
                    {student.name}
                </Link>
            </li>
        )
    }
    return (
        <React.Fragment>
            <Nav nav='DataTable' urlToStudent={urlToStudent} />
            <main>
                <header>
                    <h1>{STORE_LABEL}</h1>
                </header>
                <RenderTable student={student} />
            </main>
            <Footer />
        </React.Fragment>
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

export default Tableview
