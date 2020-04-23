import React from 'react'

const RenderTable = props => {
    let {student, studentNames, studentData, handleTableviewSelect} = props

    let currentUser = ''
    const selectItems = studentNames.map(row => {
        if (student !== undefined && student.username === row.username) {
            currentUser = row.username
        }
        return (
            <option key={row.id} id={row.id} value={row.username}>
                {row.name}
            </option>
        )
    })

    let tableData = studentData.map((datapoint, index) => {
        return (
            <tr key={index}>
                <td>{datapoint.username}</td>
                <td>{datapoint.assignment}</td>
                <td>{datapoint.difficultyRating}</td>
                <td>{datapoint.enjoymentRating}</td>
            </tr>
        )
    })

    return (
        <React.Fragment>
            <p>
                Filter by student:{' '}
                <select
                    onChange={event => handleTableviewSelect(event)}
                    value={student.username}
                >
                    {selectItems}
                </select>
            </p>
            <div className='tableview'>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Assignment</th>
                            <th>Difficulty</th>
                            <th>Enjoyment</th>
                        </tr>
                    </thead>
                    <tbody>{tableData}</tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

export default RenderTable
