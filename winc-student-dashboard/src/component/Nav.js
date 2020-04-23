import React from 'react'
import {Link} from 'react-router-dom'

import {
    HOME_URL,
    HOME_LABEL,
    STORE_URL,
    STORE_LABEL,
    LOGO_IMAGE,
    LOGO_ALT_TEXT
} from '../Config'

const Nav = props => {
    switch (props.nav) {
        case 'DataTable':
            return (
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>
                                <img src={LOGO_IMAGE} alt={LOGO_ALT_TEXT} />
                            </Link>
                        </li>
                        <li>
                            <Link to={HOME_URL}>{HOME_LABEL}</Link>
                        </li>
                        <li>
                            <Link
                                className='active'
                                to={`${HOME_URL}${STORE_URL}`}
                            >
                                {STORE_LABEL}
                            </Link>
                        </li>
                        {props.urlToStudent}
                    </ul>
                </nav>
            )
        case 'StudentList':
            return (
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>
                                <img src={LOGO_IMAGE} alt={LOGO_ALT_TEXT} />
                            </Link>
                        </li>
                        <li>
                            <Link className='active' to={HOME_URL}>
                                {HOME_LABEL}
                            </Link>
                        </li>
                        <li>
                            <Link to={`${HOME_URL}${STORE_URL}`}>
                                {STORE_LABEL}
                            </Link>
                        </li>
                    </ul>
                </nav>
            )
        case 'Student':
            return (
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>
                                <img src={LOGO_IMAGE} alt={LOGO_ALT_TEXT} />
                            </Link>
                        </li>
                        <li>
                            <Link className='active' to='/'>
                                {HOME_LABEL}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`${HOME_URL}${STORE_URL}/id/${props.id}/username/${props.username}`}
                            >
                                {STORE_LABEL}
                            </Link>
                        </li>
                    </ul>
                </nav>
            )

        default:
            return (
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>
                                <img src={LOGO_IMAGE} alt={LOGO_ALT_TEXT} />
                            </Link>
                        </li>
                        <li>
                            <Link to='/'>{HOME_LABEL}</Link>
                        </li>
                    </ul>
                </nav>
            )
    }
}

export default Nav
