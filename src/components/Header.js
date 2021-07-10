import React from 'react';
import logo from '../images/logo-header.svg'


function Header(props) {
    return(
        <header className="header">
            <img className="header__logo" alt="логотип место" src={logo}/>
            {props.children}

        </header>
    )
}
export default Header