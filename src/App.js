import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import Student from './component/student/Student'
import Dashboard from './component/dashboard/Dashboard'
import TableView from './component/tableview/TableView'
import {HOME_URL, STORE_URL} from './Config'

/**
 *
 *  Use these static files instead of getApiData for testing
 *
 */

import studentData from './data/studentData.json'
import metaData from './data/metaData.json'

/**
 *
 *  Main component for the Student Dashboard
 *  State:
 *    studentData: Sample student data from Winc headquarters
 *    metaData: Sample metadata from https://www.mockaroo.com/ for 10 students
 *
 *    tableView . filterByStudent: Current student username for tableview
 *    tableView . sortBy: Current tableview sort column
 *      (username, assignment, difficultyRating, enjoymentRating)
 *    tableView . sortOrder: Current tableview sort order (asc or desc)
 *
 *    charts . difficultyRating: Boolean for switching difficulty rating data
 *    charts . enjoymentRating: Boolean for switching enjoyment rating data
 *    charts . chartType: Boolean for switching chart type
 *
 *    filter . dashboard: Conditional rendering of chart by student selection
 *
 */

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

        this.handleChartSwitches = this.handleChartSwitches.bind(this)
        this.handleFilterDashboard = this.handleFilterDashboard.bind(this)
        this.handleTableSort = this.handleTableSort.bind(this)
        this.handleTableviewSelect = this.handleTableviewSelect.bind(this)

        this.getAssignmentForStudent = this.getAssignmentForStudent.bind(this)
        this.getAssignmentNames = this.getAssignmentNames.bind(this)
        this.getAssignmentsAverage = this.getAssignmentsAverage.bind(this)
        this.getFilterNames = this.getFilterNames.bind(this)
        this.getFilterState = this.getFilterState.bind(this)
        this.getStudentNames = this.getStudentNames.bind(this)
    }

    // Use static files instead of getApiData for testing; switch to API later

    // componentDidMount() {
    // this.getApiData('GET', '/studentData.json').then(data => {
    //     this.setState({studentData: data})
    // })
    // this.getApiData('GET', '/metaData.json').then(data => {
    //     this.setState({metaData: data})
    // })
    // }
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

    // Callback function with active students used in dashboard filter
    getFilterNames() {
        let filterNames = this.state.filter.dashboard
        let filterState = this.getFilterState()
        if (filterNames.length !== 0) {
            filterNames = filterNames.join(', ').replace(/,([^,]*)$/, ' and $1')

            if (filterState[1]) {
                return 'Filtered rating includes ALL students'
            }
            return `Filtered rating includes: ${filterNames}`
        }
        return ' '
    }

    // Callback function with active filter state
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

    // Update state with currently selected students
    handleFilterDashboard(event, username) {
        event.preventDefault()
        this.setState(state => {
            const exists = state.filter.dashboard.find(item => {
                return username === item
            })
            if (exists === undefined) {
                state.filter.dashboard.push(username)
            } else {
                state.filter.dashboard = state.filter.dashboard.filter(item => {
                    return username !== item
                })
            }
            return state
        })
    }

    // Update state with sort column and order for tableview
    handleTableSort(sortBy) {
        this.setState(state => {
            let sortOrder = state.tableView.sortOrder
            sortBy !== state.tableView.sortBy && (sortOrder = false)
            state.tableView.sortBy = sortBy
            state.tableView.sortOrder = !sortOrder
            return state
        })
    }

    // Parse student names from student data
    // Adds ID and username for routing purposes
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

    // Parse assignment names from student data
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

    // Calculate average assignment difficulty and enjoyment
    //   ratings for all students
    getAssignmentsAverage() {
        let studentData = this.state.studentData
        const dashboardFilter = this.state.filter.dashboard
        let assignments = this.getAssignmentNames()
        let assignmentsWithData = assignments.map(a => {
            let data = {}
            if (dashboardFilter.length !== 0) {
                data = studentData.filter(s => {
                    return (
                        a.assignment === s.assignment &&
                        dashboardFilter.indexOf(s.username.toLowerCase()) > -1
                    )
                })
            } else {
                data = studentData.filter(s => {
                    return a.assignment === s.assignment
                })
            }
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

    // Calculate average assignment difficulty and enjoyment ratings
    //   for one student (modified version of getAssignmentsAverage)
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

    // Update state with selected student for tableview
    handleTableviewSelect(event) {
        event.preventDefault()
        const student = event.target.value
        this.setState(state => {
            state.tableView.filterByStudent = student
            return state
        })
    }

    // Update state with chartType, difficultyRating and enjoymentRating
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
        const chartType = this.state.charts.chartType
        const difficultyRating = this.state.charts.difficultyRating
        const enjoymentRating = this.state.charts.enjoymentRating
        const filterByStudent = this.state.tableView.filterByStudent
        const metadata = this.state.metaData
        const studentData = this.state.studentData
        const tableView = this.state.tableView

        /**
         *
         *   Router configuration for 4 endpoints:
         *     /dashboard/students => Home URL
         *     /dashboard/students/tableview => Tableview (optional)
         *     /dashboard/students/tableview/id/:id/username/:username
         *       => Tableview for selected student
         *          id: Student ID
         *          username: Student username in lowercase
         *          /id/ and /username/ are for URL readability
         *          Combination of id and username makes URLs unique
         *     /dashboard/students/id/:id/username/:username
         *       => Student details for selected student
         *          id: Student ID
         *          username: Student username in lowercase
         *          /id/ and /username/ are for URL readability
         *          Combination of id and username makes URLs unique
         *     / => Redirects website root to /dashboard/students
         *
         **/

        return (
            <Router>
                <Switch>
                    <Route exact path={HOME_URL}>
                        <Dashboard
                            chartType={chartType}
                            difficultyRating={difficultyRating}
                            enjoymentRating={enjoymentRating}
                            getAssignmentsAverage={this.getAssignmentsAverage}
                            getFilterNames={this.getFilterNames}
                            getFilterState={this.getFilterState}
                            getStudentNames={this.getStudentNames}
                            handleChartSwitches={this.handleChartSwitches}
                            handleFilterDashboard={this.handleFilterDashboard}
                            metadata={metadata}
                            studentData={studentData}
                        />
                    </Route>
                    <Route exact path={`${HOME_URL}${STORE_URL}`}>
                        <TableView
                            filterByStudent={filterByStudent}
                            getStudentNames={this.getStudentNames}
                            handleTableSort={this.handleTableSort}
                            handleTableviewSelect={this.handleTableviewSelect}
                            studentData={studentData}
                            tableView={tableView}
                        />
                    </Route>
                    <Route
                        exact
                        path={`${HOME_URL}${STORE_URL}/id/:id/username/:username`}
                    >
                        <TableView
                            filterByStudent={filterByStudent}
                            getStudentNames={this.getStudentNames}
                            handleTableSort={this.handleTableSort}
                            handleTableviewSelect={this.handleTableviewSelect}
                            studentData={studentData}
                            tableView={tableView}
                        />
                    </Route>
                    <Route exact path={`${HOME_URL}/id/:id/username/:username`}>
                        <Student
                            chartType={chartType}
                            difficultyRating={difficultyRating}
                            enjoymentRating={enjoymentRating}
                            getAssignmentForStudent={
                                this.getAssignmentForStudent
                            }
                            getStudentNames={this.getStudentNames}
                            handleChartSwitches={this.handleChartSwitches}
                            metadata={metadata}
                        />
                    </Route>
                    <Redirect from='/' to={HOME_URL} />
                </Switch>
            </Router>
        )
    }
}

export default App
