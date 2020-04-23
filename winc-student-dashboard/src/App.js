import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams
} from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ChartExample from './components/ChartExample'
import {HOME_URL, HOME_LABEL, STORE_URL, STORE_LABEL} from './Config'

import Students from './data/students.json'
import Metadata from './data/metadata.json'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path={HOME_URL} children={<StudentList />} />
                <Route
                    exact
                    path={`${HOME_URL}${STORE_URL}`}
                    children={<DataTable />}
                />
                <Route
                    path={`${HOME_URL}${STORE_URL}/id/:id/username/:username`}
                    children={<DataTable />}
                />
                <Route
                    path={`${HOME_URL}/id/:id/username/:username`}
                    children={<Student />}
                />

                <Redirect from='/' to={HOME_URL} />
            </Switch>
        </Router>
    )
}

const Student = () => {
    const {username, id} = useParams()

    return (
        <React.Fragment>
            <Nav nav='Student' id={id} username={username} />
            <StudentDetails id={id} />
            <Footer />
        </React.Fragment>
    )
}

const StudentDetails = props => {
    const {id} = props

    const students = parseStudents()
    let student = students.find(student => {
        return student.id === parseInt(id)
    })
    const metadata = parseMetadata()
    let studentData = metadata.find(row => {
        return student.id === parseInt(row.id)
    })

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
                            src={value}
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
    )
}

const StudentList = () => {
    const studentList = parseStudents()
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
                    <ChartExample />
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

const DataTable = () => {
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

const RenderTable = props => {
    let students = parseStudents()
    let student = props.student
    let currentUser = ''
    const selectItems = students.map(row => {
        if (student !== undefined && student.username === row.username) {
            currentUser = row.username
        }
        return (
            <option key={row.id} id={row.id} value={row.username}>
                {row.name}
            </option>
        )
    })
    return (
        <p>
            Filter by student:{' '}
            <select defaultValue={currentUser}>{selectItems}</select>
        </p>
    )
}

export default App
