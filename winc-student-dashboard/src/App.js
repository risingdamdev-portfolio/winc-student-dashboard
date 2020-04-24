import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import Student from './component/student/Student'
import Dashboard from './component/dashboard/Dashboard'
import Tableview from './component/tableview/Tableview'

// Use static files instead of getApiData for testing
import studentData from './data/studentData.json'
import metaData from './data/metaData.json'

import {HOME_URL, STORE_URL} from './Config'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            studentData: studentData,
            metaData: metaData,
            tableView: {
                filterByStudent: '',
                sortBy: 'assignment',
                sortOrder: true
            },
            charts: {difficultyRating: true, enjoymentRating: true}
        }
        this.handleTableviewSelect = this.handleTableviewSelect.bind(this)
        this.handleChartSwitches = this.handleChartSwitches.bind(this)
        this.getAssignmentForStudent = this.getAssignmentForStudent.bind(this)
        this.getAssignmentsAverage = this.getAssignmentsAverage.bind(this)
        this.getAssignmentNames = this.getAssignmentNames.bind(this)
        this.getStudentNames = this.getStudentNames.bind(this)
        this.handleTableSort = this.handleTableSort.bind(this)
    }

    componentDidMount() {
        // Use static files instead of getApiData for testing
        // this.getApiData('GET', '/studentData.json').then(data => {
        //     this.setState({studentData: data})
        // })
        // this.getApiData('GET', '/metaData.json').then(data => {
        //     this.setState({metaData: data})
        // })
    }

    // Use static files instead of getApiData for testing
    // async getApiData(method, api, body) {
    //     try {
    //         let result = await fetch(api, {
    //             method: method,
    //             body: JSON.stringify(body)
    //         })
    //         return await result.json()
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    handleTableSort(sortBy) {
        this.setState(state => {
            let sortOrder = state.tableView.sortOrder
            sortBy !== state.tableView.sortBy && (sortOrder = false)
            state.tableView.sortBy = sortBy
            state.tableView.sortOrder = !sortOrder
            return state
        })
    }

    getStudentNames() {
        const studentData = this.state.studentData

        let studentNames = []
        let studentID = 1
        studentData.forEach(row => {
            if (
                studentNames.findIndex(
                    index => index.username === row.username
                ) === -1
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

    getAssignmentNames() {
        const studentData = this.state.studentData
        let assignments = []
        const map = new Map()
        for (const item of studentData) {
            if (!map.has(item.assignment)) {
                map.set(item.assignment, true)
                assignments.push({assignment: item.assignment})
            }
        }
        return assignments
    }

    getAssignmentsAverage() {
        const studentData = this.state.studentData
        let assignments = this.getAssignmentNames()

        let assignmentsWithData = assignments.map(a => {
            let data = studentData.filter(s => {
                return a.assignment === s.assignment
            })
            const count = data.length
            let difficultyRating = data
                .map(d => {
                    return parseInt(d.difficultyRating)
                })
                .reduce((a, b) => a + b, 0)
            difficultyRating = Math.round(difficultyRating / count)
            let enjoymentRating = data
                .map(e => {
                    return parseInt(e.enjoymentRating)
                })
                .reduce((a, b) => a + b, 0)
            enjoymentRating = Math.round(enjoymentRating / count)
            return {
                assignment: a.assignment,
                difficultyRating: difficultyRating,
                enjoymentRating: enjoymentRating
            }
        })
        return assignmentsWithData
    }

    getAssignmentForStudent(props) {
        const {student} = props
        const studentData = this.state.studentData
        let assignments = this.getAssignmentNames(studentData)

        let assignmentsWithData = assignments.map(a => {
            let data = studentData.filter(s => {
                return (
                    a.assignment === s.assignment &&
                    student === s.username.toLowerCase()
                )
            })
            return {
                assignment: a.assignment,
                difficultyRating: parseInt(data[0].difficultyRating),
                enjoymentRating: parseInt(data[0].enjoymentRating)
            }
        })
        return assignmentsWithData
    }

    handleTableviewSelect(event) {
        event.preventDefault()
        const student = event.target.value
        this.setState(state => {
            state.tableView.filterByStudent = student
            return state
        })
    }

    handleChartSwitches(event, ratingType) {
        event.preventDefault()
        this.setState(state => {
            if (ratingType) {
                state.charts.difficultyRating = !state.charts.difficultyRating
            } else {
                state.charts.enjoymentRating = !state.charts.enjoymentRating
            }
            return state
        })
    }

    render() {
        const metadata = this.state.metaData
        const studentData = this.state.studentData
        const filterByStudent = this.state.tableView.filterByStudent
        const difficultyRating = this.state.charts.difficultyRating
        const enjoymentRating = this.state.charts.enjoymentRating
        const tableView = this.state.tableView

        return (
            <Router>
                <Switch>
                    <Route exact path={HOME_URL}>
                        <Dashboard
                            getStudentNames={this.getStudentNames}
                            metadata={metadata}
                            studentData={studentData}
                            getAssignmentsAverage={this.getAssignmentsAverage}
                            handleChartSwitches={this.handleChartSwitches}
                            difficultyRating={difficultyRating}
                            enjoymentRating={enjoymentRating}
                        />
                    </Route>
                    <Route exact path={`${HOME_URL}${STORE_URL}`}>
                        <Tableview
                            getStudentNames={this.getStudentNames}
                            studentData={studentData}
                            handleTableviewSelect={this.handleTableviewSelect}
                            filterByStudent={filterByStudent}
                            handleTableSort={this.handleTableSort}
                            tableView={tableView}
                        />
                    </Route>
                    <Route
                        exact
                        path={`${HOME_URL}${STORE_URL}/id/:id/username/:username`}
                    >
                        <Tableview
                            getStudentNames={this.getStudentNames}
                            studentData={studentData}
                            handleTableviewSelect={this.handleTableviewSelect}
                            filterByStudent={filterByStudent}
                            handleTableSort={this.handleTableSort}
                            tableView={tableView}
                        />
                    </Route>
                    <Route exact path={`${HOME_URL}/id/:id/username/:username`}>
                        <Student
                            getStudentNames={this.getStudentNames}
                            metadata={metadata}
                            handleChartSwitches={this.handleChartSwitches}
                            getAssignmentForStudent={
                                this.getAssignmentForStudent
                            }
                            difficultyRating={difficultyRating}
                            enjoymentRating={enjoymentRating}
                        />
                    </Route>
                    <Redirect from='/' to={HOME_URL} />
                </Switch>
            </Router>
        )
    }
}

export default App
