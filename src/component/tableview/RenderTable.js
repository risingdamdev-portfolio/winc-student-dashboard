import React from 'react'

/**
 *
 *  @param {object} props:
 *    student: Current student selected for display
 *      From state if available, from URL if available, or first student
 *    studentNames: Sample student data from Winc headquarters
 *    studentDataFiltered: Filtered data for current student
 *    handleTableviewSelect: Callback function for selecting student dataset
 *    handleTableSort: Callback function for sorting table columns
 *    tableView: Active table sort order and column name
 *
 */

const RenderTable = props => {
    let {
        student,
        studentNames,
        studentDataFiltered,
        handleTableviewSelect,
        handleTableSort,
        tableView
    } = props

    const selectItems = studentNames.map(row => {
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
            <form>
                <div className='filterByStudent'>
                    <span>Filter by student</span>
                    <select
                        onChange={event => handleTableviewSelect(event)}
                        value={student.username}
                    >
                        {selectItems}
                    </select>
                </div>
            </form>

            {/* Tenary logic for conditional rendering of column sort */}
            <div className='tableview'>
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => handleTableSort('username')}>
                                Username
                                {tableView.sortBy === 'username' ? (
                                    tableView.sortOrder === true ? (
                                        <img
                                            src={'/image/sort-asc.svg'}
                                            alt='Sort'
                                        />
                                    ) : (
                                        <img
                                            src={'/image/sort-desc.svg'}
                                            alt='Sort'
                                        />
                                    )
                                ) : (
                                    <img src={'/image/sort.png'} alt='Sort' />
                                )}
                            </th>
                            <th onClick={() => handleTableSort('assignment')}>
                                Assignment
                                {tableView.sortBy === 'assignment' ? (
                                    tableView.sortOrder === true ? (
                                        <img
                                            src={'/image/sort-asc.svg'}
                                            alt='Sort'
                                        />
                                    ) : (
                                        <img
                                            src={'/image/sort-desc.svg'}
                                            alt='Sort'
                                        />
                                    )
                                ) : (
                                    <img src={'/image/sort.png'} alt='Sort' />
                                )}
                            </th>
                            <th
                                onClick={() =>
                                    handleTableSort('difficultyRating')
                                }
                            >
                                Difficulty
                                {tableView.sortBy === 'difficultyRating' ? (
                                    tableView.sortOrder === true ? (
                                        <img
                                            src={'/image/sort-asc.svg'}
                                            alt='Sort'
                                        />
                                    ) : (
                                        <img
                                            src={'/image/sort-desc.svg'}
                                            alt='Sort'
                                        />
                                    )
                                ) : (
                                    <img src={'/image/sort.png'} alt='Sort' />
                                )}
                            </th>
                            <th
                                onClick={() =>
                                    handleTableSort('enjoymentRating')
                                }
                            >
                                Enjoyment
                                {tableView.sortBy === 'enjoymentRating' ? (
                                    tableView.sortOrder === true ? (
                                        <img
                                            src={'/image/sort-asc.svg'}
                                            alt='Sort'
                                        />
                                    ) : (
                                        <img
                                            src={'/image/sort-desc.svg'}
                                            alt='Sort'
                                        />
                                    )
                                ) : (
                                    <img src={'/image/sort.png'} alt='Sort' />
                                )}
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
