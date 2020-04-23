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

const StudentList = props => {
    const {studentNames} = props

    let studentList = sortColumn(studentNames, true, 'username')

    let listElements = []
    listElements = studentList.map(row => {
        let url = `${HOME_URL}/id/${row.id}/username/${row.username}`
        let urlToTable = `${HOME_URL}${STORE_URL}/id/${row.id}/username/${row.username}`
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

export default StudentList
