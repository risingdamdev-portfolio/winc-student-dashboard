import React from 'react'
import {
    VictoryBar,
    VictoryChart,
    VictoryAxis,
    VictoryTooltip,
    VictoryLine,
    VictoryGroup
} from 'victory'

import wincTheme from './wincTheme'

const getRandomRating = () => Math.random() * 5

let assignmentRatingAverage = [
    {assignment: 'W1D1-2'},
    {assignment: 'W1D1-1'},
    {assignment: 'W1D1-3'},
    {assignment: 'W1D2-1'},
    {assignment: 'W1D2-2'},
    {assignment: 'W1D3-1'},
    {assignment: 'W1D3-1'},
    {assignment: 'W1D3-2'},
    {assignment: 'W1D3-3'},
    {assignment: 'W1D3-4'},
    {assignment: 'W1D3-5'},
    {assignment: 'W1D3-6'}
]

assignmentRatingAverage = assignmentRatingAverage.map(avg => ({
    assignment: avg.assignment,
    difficultyRating: getRandomRating(),
    enjoymentRating: getRandomRating()
}))

// Add label
const assignmentRatingAverageWithLabels = assignmentRatingAverage.map(avg => ({
    assignment: avg.assignment,
    difficultyRating: avg.difficultyRating,
    enjoymentRating: avg.enjoymentRating,
    label: `Opdracht ${
        avg.assignment
    }, difficultyRating: ${avg.difficultyRating.toFixed(
        1
    )}, enjoymentRating: ${avg.enjoymentRating.toFixed(1)}`
}))

const Charts = () => (
    <React.Fragment>
        <VictoryChart domainPadding={20} theme={wincTheme}>
            <VictoryGroup offset={15}>
                <VictoryBar
                    labelComponent={<VictoryTooltip />}
                    data={assignmentRatingAverageWithLabels}
                    x='assignment'
                    y='difficultyRating'
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={assignmentRatingAverageWithLabels.map(
                        avg => avg.assignment
                    )}
                />
                <VictoryBar
                    labelComponent={<VictoryTooltip />}
                    data={assignmentRatingAverageWithLabels}
                    x='assignment'
                    y='enjoymentRating'
                    tickValues={[1, 2, 3, 4, 5]}
                    tickFormat={assignmentRatingAverageWithLabels.map(
                        avg => avg.assignment
                    )}
                />
            </VictoryGroup>
            <VictoryAxis
                tickValues={[1, 2, 3, 4, 5]}
                tickFormat={assignmentRatingAverageWithLabels.map(
                    avg => avg.assignment
                )}
            />
            <VictoryAxis dependentAxis />
        </VictoryChart>

        {/* <VictoryChart domainPadding={15} theme={wincTheme}>
            <VictoryLine
                style={{
                    data: {stroke: '#c43a31'},
                    parent: {border: '1px solid #ccc'}
                }}
                data={assignmentRatingAverage}
                x='assignment'
                y='difficultyRating'
            />
            <VictoryLine
                style={{
                    data: {stroke: '#ff00ff'},
                    parent: {border: '1px solid #ccc'}
                }}
                data={assignmentRatingAverage}
                x='assignment'
                y='enjoymentRating'
            />
            <VictoryAxis
                // tickValues specifies both the number of ticks and where
                // they are placed on the axis
                tickValues={[1, 2, 3, 4, 5]}
                tickFormat={assignmentRatingAverage.map(avg => avg.assignment)}
            />
            <VictoryAxis dependentAxis />
        </VictoryChart> */}
    </React.Fragment>
)
export default Charts
