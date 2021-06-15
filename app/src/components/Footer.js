import React, {useRef, useEffect} from 'react';
import './Footer.css'

function Footer() {
    const date = useRef();

    useEffect(() => {
        date.current.innerText = new Date().getFullYear();
    })

    return (
        <footer>
            <p>&copy; All rights reserved | <span ref={date}></span></p>
        </footer>  
    )
}

export default Footer
