import React from 'react'
import {useParams} from 'react-router-dom'

import Nav from './Nav'
import Footer from './Footer'
import RenderTable from './RenderTable'

import {HOME_URL, STORE_LABEL} from '../Config'

const TableView = props => {
    const params = useParams()
    const {
        studentNames,
        students,
        handleTableviewSelect,
        tableViewStudent
    } = props

    let student = ''
    if (tableViewStudent !== '') {
        student = studentNames.find(student => {
            return student.username === tableViewStudent.toLowerCase()
        })
    } else if (params.username !== undefined) {
        student = studentNames.find(student => {
            return student.username === params.username
        })
    }
    console.log(student)

    if (student === '') {
        student = studentNames[0]
    }

    let studentData = students.filter(row => {
        return student.username === row.username.toLowerCase()
    })

    let urlToStudent = ''
    if (student.id !== undefined && student !== undefined) {
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
                    studentData={studentData}
                    handleTableviewSelect={handleTableviewSelect}
                />
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default TableView
