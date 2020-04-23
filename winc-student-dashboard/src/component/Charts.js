import React from 'react'
import {
    VictoryBar,
    VictoryChart,
    VictoryAxis,
    VictoryTooltip,
    VictoryGroup,
    VictoryLine,
    VictoryLabel
} from 'victory'

import wincTheme from './wincTheme'

const Charts = props => {
    const {
        getAssignmentsAverage,
        handleChartSwitches,
        difficultyRating,
        enjoymentRating
    } = props

    let chartData = getAssignmentsAverage()

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
                    difficultyRating{' '}
                    {difficultyRating ? <span>on</span> : <span>off</span>}
                </button>
                <button
                    className='enjoymentRating'
                    onClick={event => handleChartSwitches(event, false)}
                >
                    enjoymentRating{' '}
                    {enjoymentRating ? <span>on</span> : <span>off</span>}
                </button>
                <VictoryChart
                    domainPadding={6}
                    theme={wincTheme}
                    width={1200}
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
            <figure>
                <button
                    className='difficultyRating'
                    onClick={event => handleChartSwitches(event, true)}
                >
                    difficultyRating{' '}
                    {difficultyRating ? <span>on</span> : <span>off</span>}
                </button>
                <button
                    className='enjoymentRating'
                    onClick={event => handleChartSwitches(event, false)}
                >
                    enjoymentRating{' '}
                    {enjoymentRating ? <span>on</span> : <span>off</span>}
                </button>
                <VictoryChart
                    domainPadding={6}
                    theme={wincTheme}
                    width={1200}
                    height={400}
                    padding={{top: 20, bottom: 120, left: 60, right: 100}}
                >
                    {difficultyRating ? (
                        <VictoryLine
                            style={{
                                data: {stroke: '#f2ba0d'}
                            }}
                            labelComponent={<VictoryTooltip />}
                            data={chartData}
                            x='assignment'
                            y='difficultyRating'
                        />
                    ) : null}
                    {enjoymentRating ? (
                        <VictoryLine
                            style={{
                                data: {stroke: '#F27F0D'}
                            }}
                            labelComponent={<VictoryTooltip />}
                            data={chartData}
                            x='assignment'
                            y='enjoymentRating'
                        />
                    ) : null}
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

export default Charts
