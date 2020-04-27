import React from 'react'
import {useParams, Link} from 'react-router-dom'
import Nav from '../common/Nav'
import StudentChart from './StudentChart'
import Footer from '../common/Footer'
import {HOME_URL, STORE_URL, STORE_LABEL} from '../../Config'

/**
 *
 *  @param {object} props:
 *    getStudentNames: Returns a list of students names with ID and username
 *    metadata: Sample metadata from https://www.mockaroo.com/ for 10 students
 *    handleChartSwitches: Callback function for conditional display of charts
 *    getAssignmentForStudent: Callback function for ratings for one student
 *    difficultyRating: Boolean for switching difficulty rating
 *    enjoymentRating: Boolean for switching enjoyment rating
 *    chartType: Boolean for switching chart type
 *
 */

const Student = props => {
    const {username, id} = useParams()
    const {
        chartType,
        difficultyRating,
        enjoymentRating,
        getAssignmentForStudent,
        getStudentNames,
        handleChartSwitches,
        metadata
    } = props

    const studentNames = getStudentNames()

    let student = studentNames.find(student => {
        return student.id === parseInt(id)
    })

    const studentData = metadata.find(row => {
        return student.id === parseInt(row.id)
    })

    let tableData = []
    let keyID = 0
    let lastName = ''
    let studentAvatar = {}

    const urlToStudent = (
        <li>
            <a
                className='active'
                href={`${HOME_URL}/id/${student.id}/username/${student.username}`}
            >
                {student.name}
            </a>
        </li>
    )
    const urlToTable = `${HOME_URL}${STORE_URL}/id/${student.id}/username/${student.username}`

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
            studentAvatar = (
                <img
                    className='avatar student'
                    src={`/image/avatar/${value}`}
                    width='80'
                    height='80'
                    alt={student.name}
                />
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
        <React.Fragment>
            <Nav
                id={id}
                nav='Student'
                urlToStudent={urlToStudent}
                username={username}
            />
            <main>
                <header>
                    {studentAvatar}
                    <h1>
                        {student.name} {lastName}
                    </h1>
                </header>
                <StudentChart
                    chartType={chartType}
                    difficultyRating={difficultyRating}
                    enjoymentRating={enjoymentRating}
                    getAssignmentForStudent={getAssignmentForStudent}
                    handleChartSwitches={handleChartSwitches}
                    urlToTable={urlToTable}
                    username={username}
                />

                <table className='studentTable'>
                    <thead>
                        <tr className='skip'>
                            <th colSpan='2'>
                                <h2>Student Details</h2>
                            </th>
                        </tr>
                    </thead>
                    <tbody>{tableData}</tbody>
                </table>

                <Link className='toTableview' to={urlToTable}>
                    {STORE_LABEL}
                </Link>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default Student
