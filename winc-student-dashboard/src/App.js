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
            charts: {
                difficultyRating: true,
                enjoymentRating: true,
                chartType: true
            },
            filter: {
                dashboard: []
            }
        }
        this.handleTableviewSelect = this.handleTableviewSelect.bind(this)
        this.handleChartSwitches = this.handleChartSwitches.bind(this)
        this.getAssignmentForStudent = this.getAssignmentForStudent.bind(this)
        this.getAssignmentsAverage = this.getAssignmentsAverage.bind(this)
        this.getAssignmentNames = this.getAssignmentNames.bind(this)
        this.getStudentNames = this.getStudentNames.bind(this)
        this.handleTableSort = this.handleTableSort.bind(this)
        this.handleFilterDashboard = this.handleFilterDashboard.bind(this)
        this.getFilterState = this.getFilterState.bind(this)
    }

    // componentDidMount() {
    // Use static files instead of getApiData for testing
    // this.getApiData('GET', '/studentData.json').then(data => {
    //     this.setState({studentData: data})
    // })
    // this.getApiData('GET', '/metaData.json').then(data => {
    //     this.setState({metaData: data})
    // })
    // }
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

    getFilterState(id) {
        const selfFilter = this.state.filter.dashboard.indexOf(id) > -1
        let allFilter = false
        if (
            this.state.filter.dashboard === [] ||
            this.state.filter.dashboard.length === this.state.metaData.length
        ) {
            allFilter = true
        }
        return [selfFilter, allFilter]
    }

    handleFilterDashboard(event, id) {
        //console.log(id)
        event.preventDefault()
        this.setState(state => {
            let exists = state.filter.dashboard.find(item => {
                return id === item
            })
            if (exists === undefined) {
                state.filter.dashboard.push(id)
            } else {
                state.filter.dashboard = state.filter.dashboard.filter(item => {
                    return id !== item
                })
            }
            return state
        })
    }

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

    handleChartSwitches(event, chartSwitch) {
        event.preventDefault()
        this.setState(state => {
            if (chartSwitch === '') {
                state.charts.chartType = !state.charts.chartType
                return state
            }
            if (chartSwitch) {
                state.charts.difficultyRating = !state.charts.difficultyRating
                if (
                    state.charts.difficultyRating === false &&
                    state.charts.enjoymentRating === false
                ) {
                    state.charts.enjoymentRating = true
                }
            } else {
                state.charts.enjoymentRating = !state.charts.enjoymentRating
                if (
                    state.charts.enjoymentRating === false &&
                    state.charts.difficultyRating === false
                ) {
                    state.charts.difficultyRating = true
                }
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
        const chartType = this.state.charts.chartType
        const tableView = this.state.tableView

        console.log(this.state.filter.dashboard)

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
                            chartType={chartType}
                            handleFilterDashboard={this.handleFilterDashboard}
                            getFilterState={this.getFilterState}
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
                            chartType={chartType}
                        />
                    </Route>
                    <Redirect from='/' to={HOME_URL} />
                </Switch>
            </Router>
        )
    }
}

export default App
