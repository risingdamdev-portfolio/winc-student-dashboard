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
        getStudentNames,
        metadata,
        getAssignmentsAverage,
        handleChartSwitches,
        difficultyRating,
        enjoymentRating,
        chartType,
        handleFilterDashboard,
        getFilterState,
        getFilterNames
    } = props

    let studentList = Sort(getStudentNames(), true, 'username')

    let listElements = []
    listElements = studentList.map(row => {
        let studentData = metadata.find(meta => {
            return parseInt(meta.id) === row.id
        })

        let url = `${HOME_URL}/id/${row.id}/username/${row.username}`
        let urlToTable = `${HOME_URL}${STORE_URL}/id/${row.id}/username/${row.username}`

        const checkboxState = getFilterState(row.username)
        const localCheckboxState = checkboxState[0]
        const globalCheckboxState = checkboxState[1]

        return (
            <li
                key={row.id}
                className={
                    localCheckboxState
                        ? globalCheckboxState
                            ? 'dimmed'
                            : null
                        : null
                }
            >
                <button
                    className={
                        localCheckboxState ? 'checkBox' : 'checkBox gray'
                    }
                    onClick={event =>
                        handleFilterDashboard(event, row.username)
                    }
                >
                    filter{' '}
                    {localCheckboxState ? <span>on</span> : <span>off</span>}
                </button>
                <Link to={url}>
                    <img
                        className='avatar'
                        src={`/avatar/${studentData.avatar}`}
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
            <Nav nav='StudentList' />
            <main>
                <header>
                    <h1>{HOME_LABEL}</h1>
                </header>

                <DashboardCharts
                    getAssignmentsAverage={getAssignmentsAverage}
                    handleChartSwitches={handleChartSwitches}
                    difficultyRating={difficultyRating}
                    enjoymentRating={enjoymentRating}
                    chartType={chartType}
                    getFilterNames={getFilterNames}
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
