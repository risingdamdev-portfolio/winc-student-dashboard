import React from 'react'

const RenderTable = props => {
    let {
        student,
        studentNames,
        studentDataFiltered,
        handleTableviewSelect,
        handleTableSort,
        tableView
    } = props

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

    let tableData = studentDataFiltered.map((datapoint, index) => {
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
                            <th onClick={() => handleTableSort('username')}>
                                Username
                                {tableView.sortBy === 'username' ? (
                                    tableView.sortOrder === true ? (
                                        <img src={'/sort-asc.svg'} />
                                    ) : (
                                        <img src={'/sort-desc.svg'} />
                                    )
                                ) : null}
                            </th>
                            <th onClick={() => handleTableSort('assignment')}>
                                Assignment
                                {tableView.sortBy === 'assignment' ? (
                                    tableView.sortOrder === true ? (
                                        <img src={'/sort-asc.svg'} />
                                    ) : (
                                        <img src={'/sort-desc.svg'} />
                                    )
                                ) : null}
                            </th>
                            <th
                                onClick={() =>
                                    handleTableSort('difficultyRating')
                                }
                            >
                                Difficulty
                                {tableView.sortBy === 'difficultyRating' ? (
                                    tableView.sortOrder === true ? (
                                        <img src={'/sort-asc.svg'} />
                                    ) : (
                                        <img src={'/sort-desc.svg'} />
                                    )
                                ) : null}
                            </th>
                            <th
                                onClick={() =>
                                    handleTableSort('enjoymentRating')
                                }
                            >
                                Enjoyment
                                {tableView.sortBy === 'enjoymentRating' ? (
                                    tableView.sortOrder === true ? (
                                        <img src={'/sort-asc.svg'} />
                                    ) : (
                                        <img src={'/sort-desc.svg'} />
                                    )
                                ) : null}
                            </th>
                        </tr>
                    </thead>
                    <tbody>{tableData}</tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

export default RenderTable
