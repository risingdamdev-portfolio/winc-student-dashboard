const sortColumn = (array, order, field) => {
    if (order) {
        return array.sort((a, b) => {
            if (a[field] < b[field]) {
                return -1
            } else if (a[field] > b[field]) {
                return 1
            }
            return 0
        })
    }
    return array.sort((a, b) => {
        if (a[field] < b[field]) {
            return 1
        } else if (a[field] > b[field]) {
            return -1
        }
        return 0
    })
}

export default sortColumn
