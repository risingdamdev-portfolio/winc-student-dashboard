import React from 'react'
import {WINC_URL, WINC_LABEL, DEV_URL, DEV_LABEL} from '../../Config'

const Footer = props => {
    return (
        <footer>
            Developed for{' '}
            <a
                href={WINC_URL}
                alt={`Link to ${WINC_LABEL}`}
                rel='noopener nofollow'
            >
                {WINC_LABEL}
            </a>{' '}
            by{' '}
            <a
                href={DEV_URL}
                alt={`Link to ${DEV_LABEL}`}
                rel='noopener nofollow'
            >
                {DEV_LABEL}
            </a>
            , © 2020 in infinitum
        </footer>
    )
}

export default Footer
