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
import Footer from './Footer'
import RenderTable from './RenderTable'

import {HOME_URL, STORE_LABEL} from '../Config'

const Tableview = props => {
    const params = useParams()

    console.log(params)

    return 'ok'
    // let student = props.studentNames.find(student => {
    //     return student.username === params.username
    // })

    // let urlToStudent = ''
    // if (params.id !== undefined && student !== undefined) {
    //     urlToStudent = (
    //         <li>
    //             <a
    //                 href={`${HOME_URL}/id/${params.id}/username/${params.username}`}
    //             >
    //                 {student.name}
    //             </a>
    //         </li>
    //     )
    // }
    // return (
    //     <React.Fragment>
    //         <Nav nav='DataTable' urlToStudent={urlToStudent} />
    //         <main>
    //             <header>
    //                 <h1>{STORE_LABEL}</h1>
    //             </header>
    //             <RenderTable student={student} />
    //         </main>
    //         <Footer />
    //     </React.Fragment>
    // )
}

export default Tableview
