import React from 'react'
import {useParams, Link} from 'react-router-dom'

import Nav from '../common/Nav'
import Footer from '../common/Footer'
import RenderTable from './RenderTable'
import Sort from '../utility/Sort'

import {HOME_URL, STORE_LABEL} from '../../Config'

/**
 *
 *  @param {object} props:
 *    getStudentNames: Returns a list of students names with ID and username
 *    studentData: Sample student data from Winc headquarters
 *    handleTableviewSelect: Callback function for selecting student dataset
 *    filterByStudent: Current student selected for display
 *    handleTableSort: Callback function for sorting table columns
 *    tableView: Active table sort order and column name
 *
 */

const Tableview = props => {
    const params = useParams()
    const {
        filterByStudent,
        getStudentNames,
        handleTableSort,
        handleTableviewSelect,
        studentData,
        tableView
    } = props

    // choose default student ...
    const studentNames = getStudentNames()
    let student = studentNames[0]

    // but change to username from URL is available ...
    if (params.username !== undefined) {
        student = studentNames.find(student => {
            return student.username === params.username
        })
    }

    // except when username is already set by state!
    if (filterByStudent !== '') {
        student = studentNames.find(student => {
            return student.username === filterByStudent.toLowerCase()
        })
    }

    // filter data for student and sort
    let studentDataFiltered = studentData.filter(row => {
        return student.username === row.username.toLowerCase()
    })
    studentDataFiltered = Sort(
        studentDataFiltered,
        tableView.sortOrder,
        tableView.sortBy
    )

    const urlToStudent = (
        <li>
            <Link
                to={`${HOME_URL}/id/${student.id}/username/${student.username}`}
            >
                {student.name}
            </Link>
        </li>
    )

    return (
        <React.Fragment>
            <Nav nav='Tableview' urlToStudent={urlToStudent} />
            <main>
                <header>
                    <h1>{STORE_LABEL}</h1>
                </header>
                <RenderTable
                    handleTableSort={handleTableSort}
                    handleTableviewSelect={handleTableviewSelect}
                    student={student}
                    studentDataFiltered={studentDataFiltered}
                    studentNames={studentNames}
                    tableView={tableView}
                />
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default Tableview
