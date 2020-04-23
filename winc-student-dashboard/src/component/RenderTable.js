import React from 'react'

const RenderTable = props => {
    let {student, studentNames} = props

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
    return (
        <p>
            Filter by student:{' '}
            <select defaultValue={currentUser}>{selectItems}</select>
        </p>
    )
}

export default RenderTable
