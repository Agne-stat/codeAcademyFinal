import React from 'react'
import { Link } from 'react-router-dom';

export default function BackButton() {
    return (
        <Link to='/' className="home-button">
            HOME
        </Link>
    )
}
