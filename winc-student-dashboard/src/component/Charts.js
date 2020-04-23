import React from 'react'
import {
    VictoryBar,
    VictoryChart,
    VictoryAxis,
    VictoryTooltip,
    VictoryGroup
} from 'victory'

import wincTheme from './wincTheme'

const Charts = props => {
    const {assignments} = props

    //console.log(assignments)

    let chartData = assignments

    chartData = chartData.map(avg => ({
        assignment: avg.assignment,
        difficultyRating: 2,
        enjoymentRating: 5
    }))

    // Add label
    const assignmentChart = chartData.map(avg => ({
        assignment: avg.assignment,
        difficultyRating: avg.difficultyRating,
        enjoymentRating: avg.enjoymentRating,
        label: `Opdracht ${
            avg.assignment
        }, difficultyRating: ${avg.difficultyRating.toFixed(
            1
        )}, enjoymentRating: ${avg.enjoymentRating.toFixed(1)}`
    }))

    return (
        <React.Fragment>
            <VictoryChart domainPadding={20} theme={wincTheme}>
                <VictoryGroup offset={5}>
                    <VictoryBar
                        labelComponent={<VictoryTooltip />}
                        data={assignmentChart}
                        x='assignment'
                        y='difficultyRating'
                        tickValues={[1, 2, 3, 4, 5]}
                        tickFormat={assignmentChart.map(avg => avg.assignment)}
                        alignment='start'
                    />
                    <VictoryBar
                        labelComponent={<VictoryTooltip />}
                        data={assignmentChart}
                        x='assignment'
                        y='enjoymentRating'
                        tickValues={[1, 2, 3, 4, 5]}
                        tickFormat={assignmentChart.map(avg => avg.assignment)}
                        alignment='start'
                    />
                </VictoryGroup>
                <VictoryAxis
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={assignmentChart.map(avg => avg.assignment)}
                />
                <VictoryAxis dependentAxis />
            </VictoryChart>

            {/* <VictoryChart domainPadding={15} theme={wincTheme}>
            <VictoryLine
                style={{
                    data: {stroke: '#c43a31'},
                    parent: {border: '1px solid #ccc'}
                }}
                data={chartData}
                x='assignment'
                y='difficultyRating'
            />
            <VictoryLine
                style={{
                    data: {stroke: '#ff00ff'},
                    parent: {border: '1px solid #ccc'}
                }}
                data={chartData}
                x='assignment'
                y='enjoymentRating'
            />
            <VictoryAxis
                // tickValues specifies both the number of ticks and where
                // they are placed on the axis
                tickValues={[1, 2, 3, 4, 5]}
                tickFormat={chartData.map(avg => avg.assignment)}
            />
            <VictoryAxis dependentAxis />
        </VictoryChart> */}
        </React.Fragment>
    )
}

export default Charts
