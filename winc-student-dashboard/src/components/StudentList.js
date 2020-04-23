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
import DashboardCharts from './DashboardCharts'
import Footer from './Footer'
import sortColumn from './SortColumn'

import {HOME_URL, HOME_LABEL, STORE_URL, STORE_LABEL} from '../Config'

import Students from '../data/students.json'
import Metadata from '../data/metadata.json'

const StudentList = () => {
    let studentList = parseStudents()
    studentList = sortColumn(studentList, true, 'username')

    let listElements = []
    listElements = studentList.map(row => {
        let url = `${HOME_URL}/id/${
            row.id
        }/username/${row.username.toLowerCase()}`
        let urlToTable = `${HOME_URL}${STORE_URL}/id/${
            row.id
        }/username/${row.username.toLowerCase()}`
        return (
            <li key={row.id}>
                <Link to={url}>{row.name}</Link> (
                <Link to={urlToTable}>Table</Link>)
            </li>
        )
    })

    return (
        <React.Fragment>
            <Nav nav='StudentList' />
            <main>
                <header>
                    <h1>{HOME_LABEL}</h1>
                </header>
                <figure>
                    <DashboardCharts />
                </figure>
                <ul>{listElements}</ul>
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

const parseMetadata = () => {
    return Metadata
}

export default StudentList
