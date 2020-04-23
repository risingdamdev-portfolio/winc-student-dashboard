import React from 'react'
import {Link} from 'react-router-dom'

import Nav from './Nav'
import DashboardCharts from './DashboardCharts'
import Footer from './Footer'
import sortColumn from './SortColumn'

import {HOME_URL, HOME_LABEL, STORE_URL, STORE_LABEL} from '../Config'

const StudentList = props => {
    const {studentNames, metadata} = props

    let studentList = sortColumn(studentNames, true, 'username')

    let listElements = []
    listElements = studentList.map(row => {
        let studentData = metadata.find(meta => {
            return parseInt(meta.id) === row.id
        })
        if (studentData !== undefined) {
            let url = `${HOME_URL}/id/${row.id}/username/${row.username}`
            let urlToTable = `${HOME_URL}${STORE_URL}/id/${row.id}/username/${row.username}`
            return (
                <li key={row.id}>
                    <img
                        className='avatar'
                        src={`/avatar/${studentData.avatar}`}
                        alt={row.name}
                    />
                    <Link to={url}>{row.name}</Link> (
                    <Link to={urlToTable}>{STORE_LABEL}</Link>)
                </li>
            )
        }
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
