import React from 'react'
import {WINC_URL, WINC_LABEL, DEV_URL, DEV_LABEL} from '../../Config'

const Footer = props => {
    return (
        <footer>
            <span>
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
            </span>
            <span>
                <a href='#top' alt={`Back to top`} rel='noopener nofollow'>
                    Back to top
                </a>
            </span>
        </footer>
    )
}

export default Footer
