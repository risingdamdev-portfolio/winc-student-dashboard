import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams
} from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Student from './components/Student'
import StudentList from './components/StudentList'
import Tableview from './components/Tableview'
import DashboardCharts from './components/DashboardCharts'
import {HOME_URL, HOME_LABEL, STORE_URL, STORE_LABEL} from './Config'

import Students from './data/students.json'
import Metadata from './data/metadata.json'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path={HOME_URL}>
                    <StudentList />
                </Route>
                <Route exact path={`${HOME_URL}${STORE_URL}`}>
                    <Tableview />
                </Route>
                <Route
                    path={`${HOME_URL}${STORE_URL}/id/:id/username/:username`}
                >
                    <Tableview />
                </Route>
                <Route path={`${HOME_URL}/id/:id/username/:username`}>
                    <Student blabla='blabla' />
                </Route>

                <Redirect from='/' to={HOME_URL} />
            </Switch>
        </Router>
    )
}

export default App
