import React from 'react'
import {
    VictoryBar,
    VictoryChart,
    VictoryAxis,
    VictoryTooltip,
    VictoryGroup,
    VictoryLabel
} from 'victory'

import wincTheme from '../utility/wincTheme'

const StudentChart = props => {
    const {
        handleChartSwitches,
        difficultyRating,
        enjoymentRating,
        getAssignmentForStudent,
        username
    } = props

    let chartData = getAssignmentForStudent({student: username})

    chartData = chartData.map(avg => ({
        assignment: avg.assignment,
        difficultyRating: avg.difficultyRating,
        enjoymentRating: avg.enjoymentRating,
        label: `Assignment: ${avg.assignment}
        difficultyRating: ${avg.difficultyRating}, enjoymentRating: ${avg.enjoymentRating}`
    }))

    return (
        <React.Fragment>
            <figure>
                <button
                    className='difficultyRating'
                    onClick={event => handleChartSwitches(event, true)}
                >
                    difficultyRating:{' '}
                    {difficultyRating ? <span>on</span> : <span>off</span>}
                </button>
                <button
                    className='enjoymentRating'
                    onClick={event => handleChartSwitches(event, false)}
                >
                    enjoymentRating:{' '}
                    {enjoymentRating ? <span>on</span> : <span>off</span>}
                </button>
                <VictoryChart
                    domainPadding={6}
                    theme={wincTheme}
                    width={1600}
                    height={400}
                    padding={{top: 20, bottom: 120, left: 60, right: 100}}
                >
                    <VictoryGroup offset={8}>
                        {difficultyRating ? (
                            <VictoryBar
                                labelComponent={<VictoryTooltip />}
                                data={chartData}
                                x='assignment'
                                y='difficultyRating'
                                tickValues={[1, 2, 3, 4, 5]}
                                alignment='start'
                                color='#f2ba0d'
                            />
                        ) : null}
                        {enjoymentRating ? (
                            <VictoryBar
                                labelComponent={<VictoryTooltip />}
                                data={chartData}
                                x='assignment'
                                y='enjoymentRating'
                                tickValues={[1, 2, 3, 4, 5]}
                                alignment='start'
                                color='#F27F0D'
                            />
                        ) : null}
                    </VictoryGroup>
                    <VictoryAxis
                        tickValues={[1, 2, 3, 4, 5]}
                        tickFormat={chartData.map(avg => avg.assignment)}
                        tickLabelComponent={
                            <VictoryLabel angle={40} textAnchor='start' />
                        }
                    />
                    <VictoryAxis dependentAxis />
                </VictoryChart>
            </figure>
        </React.Fragment>
    )
}

export default StudentChart
