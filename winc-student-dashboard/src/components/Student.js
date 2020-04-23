import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams
} from 'react-router-dom'
import Nav from './Nav'
import StudentDetails from './StudentDetails'
import Footer from './Footer'

const Student = props => {
    const {username, id} = useParams()

    return (
        <React.Fragment>
            <Nav nav='Student' id={id} username={username} />
            <StudentDetails id={id} />
            <Footer />
        </React.Fragment>
    )
}

export default Student
