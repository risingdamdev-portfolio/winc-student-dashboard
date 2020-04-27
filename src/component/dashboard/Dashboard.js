import React from 'react'
import {Link} from 'react-router-dom'

import Nav from '../common/Nav'
import DashboardCharts from './DashboardCharts'
import Footer from '../common/Footer'
import Sort from '../utility/Sort'

import {
    HOME_URL,
    HOME_LABEL,
    STORE_URL,
    STORE_LABEL,
    STUDENTS_LABEL
} from '../../Config'

/**
 *
 *  @param {object} props:
 *    getStudentNames: Returns a list of students names with ID and username
 *    metadata: Sample metadata from https://www.mockaroo.com/ for 10 students
 *    getAssignmentsAverage: Returns a list of assignments with average ratings
 *    handleChartSwitches: Callback function for conditional display of charts
 *    difficultyRating: Boolean for switching difficulty rating
 *    enjoymentRating: Boolean for switching enjoyment rating
 *    chartType: Boolean for switching chart type
 *    handleFilterDashboard: Callback for conditional display of student data
 *    getFilterState: Callback function with active filter state
 *    getFilterNames: Callback function with active students used in filter
 *
 */

const Dashboard = props => {
    const {
        chartType,
        difficultyRating,
        enjoymentRating,
        getAssignmentsAverage,
        getFilterNames,
        getFilterState,
        getStudentNames,
        handleChartSwitches,
        handleFilterDashboard,
        metadata
    } = props

    const studentList = Sort(getStudentNames(), true, 'username')

    let listElements = []
    listElements = studentList.map(row => {
        let studentData = metadata.find(meta => {
            return parseInt(meta.id) === row.id
        })

        const urlToStudent = `${HOME_URL}/id/${row.id}/username/${row.username}`
        const urlToTable = `${HOME_URL}${STORE_URL}/id/${row.id}/username/${row.username}`

        const filterState = getFilterState(row.username)
        const filterStudentState = filterState[0]
        const filterAllState = filterState[1]

        // Tenary logic for rendering student selection display
        return (
            <li
                key={row.id}
                className={
                    filterStudentState
                        ? filterAllState
                            ? 'dimmed'
                            : null
                        : null
                }
            >
                <button
                    className={
                        filterStudentState ? 'checkBox' : 'checkBox gray'
                    }
                    onClick={event =>
                        handleFilterDashboard(event, row.username)
                    }
                >
                    filter{' '}
                    {filterStudentState ? <span>on</span> : <span>off</span>}
                </button>
                <Link to={urlToStudent}>
                    <img
                        className='avatar'
                        src={`/image/avatar/${studentData.avatar}`}
                        alt={row.name}
                    />
                    <br />
                    {row.name} {studentData.name}
                </Link>
                <Link to={urlToTable}>{STORE_LABEL}</Link>
            </li>
        )
    })

    return (
        <React.Fragment>
            <Nav nav='Dashboard' />
            <main>
                <header>
                    <h1>{HOME_LABEL}</h1>
                </header>

                <DashboardCharts
                    chartType={chartType}
                    difficultyRating={difficultyRating}
                    enjoymentRating={enjoymentRating}
                    getAssignmentsAverage={getAssignmentsAverage}
                    getFilterNames={getFilterNames}
                    handleChartSwitches={handleChartSwitches}
                />

                <header>
                    <h1>{STUDENTS_LABEL}</h1>
                </header>
                <ul>{listElements}</ul>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default Dashboard
