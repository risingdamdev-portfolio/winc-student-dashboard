import React from 'react'
import {useParams} from 'react-router-dom'

import Nav from '../common/Nav'
import Footer from '../common/Footer'
import RenderTable from './RenderTable'
import Sort from '../utility/Sort'

import {HOME_URL, STORE_LABEL} from '../../Config'

const Tableview = props => {
    const params = useParams()
    const {
        getStudentNames,
        studentData,
        handleTableviewSelect,
        filterByStudent,
        handleTableSort,
        tableView
    } = props

    let studentNames = getStudentNames()
    let student = studentNames[0]

    if (params.username !== undefined) {
        student = studentNames.find(student => {
            return student.username === params.username
        })
    }

    if (filterByStudent !== '') {
        student = studentNames.find(student => {
            return student.username === filterByStudent.toLowerCase()
        })
    }

    let studentDataFiltered = studentData.filter(row => {
        return student.username === row.username.toLowerCase()
    })

    studentDataFiltered = Sort(
        studentDataFiltered,
        tableView.sortOrder,
        tableView.sortBy
    )

    let urlToStudent = ''
    if (student !== undefined) {
        urlToStudent = (
            <li>
                <a
                    href={`${HOME_URL}/id/${student.id}/username/${student.username}`}
                >
                    {student.name}
                </a>
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
                <RenderTable
                    student={student}
                    studentNames={studentNames}
                    studentDataFiltered={studentDataFiltered}
                    handleTableviewSelect={handleTableviewSelect}
                    handleTableSort={handleTableSort}
                    tableView={tableView}
                />
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default Tableview
