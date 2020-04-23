import React from 'react'
import {useParams, Link} from 'react-router-dom'
import Nav from '../common/Nav'
import StudentChart from './StudentChart'
import Footer from '../common/Footer'
import {HOME_URL, STORE_URL, STORE_LABEL} from '../../Config'

const Student = props => {
    const {username, id} = useParams()
    const {
        getStudentNames,
        metadata,
        handleChartSwitches,
        getAssignmentForStudent,
        difficultyRating,
        enjoymentRating
    } = props

    let studentNames = getStudentNames()

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

    let tableData = []
    let keyID = 0
    let lastName = ''

    let urlToStudent = ''
    let urlToTable = ''
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
        urlToTable = `${HOME_URL}${STORE_URL}/id/${student.id}/username/${student.username}`
    }

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
                    <td colSpan='2' className='center'>
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
                <StudentChart
                    handleChartSwitches={handleChartSwitches}
                    difficultyRating={difficultyRating}
                    enjoymentRating={enjoymentRating}
                    getAssignmentForStudent={getAssignmentForStudent}
                    username={username}
                />
                <table>
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
