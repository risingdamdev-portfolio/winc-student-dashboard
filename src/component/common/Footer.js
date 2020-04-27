import React from 'react'
import {Link} from 'react-router-dom'
import {WINC_URL, WINC_LABEL, DEV_URL, DEV_LABEL} from '../../Config'

/**
 *
 *  Footer component
 *
 */

const Footer = () => {
    return (
        <footer>
            <span>
                Developed for{' '}
                <Link to={WINC_URL} alt={`Link to ${WINC_LABEL}`}>
                    {WINC_LABEL}
                </Link>{' '}
                by{' '}
                <Link to={DEV_URL} alt={`Link to ${DEV_LABEL}`}>
                    {DEV_LABEL}
                </Link>
                , © 2020 in infinitum
            </span>
            <span>
                <Link to='#top'>Back to top</Link>
            </span>
        </footer>
    )
}

export default Footer
