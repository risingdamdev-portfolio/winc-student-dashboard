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
        getFilterState
    } = props

    let studentList = Sort(getStudentNames(), true, 'username')

    let listElements = []
    listElements = studentList.map(row => {
        let studentData = metadata.find(meta => {
            return parseInt(meta.id) === row.id
        })

        let url = `${HOME_URL}/id/${row.id}/username/${row.username}`
        let urlToTable = `${HOME_URL}${STORE_URL}/id/${row.id}/username/${row.username}`

        const checkboxState = getFilterState(row.id)
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
                    className='checkBox'
                    onClick={event => handleFilterDashboard(event, row.id)}
                >
                    {localCheckboxState ? 'on' : 'off'}
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
