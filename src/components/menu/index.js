import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/gflix.png';
import './Menu.css';
// import ButtonLink from '../ButtonLink'
import Button from '../Button';

function Menu() {
    return (
        <nav className = "Menu">
            <Link to = "/">
                <img class = "Logo" src = {Logo} alt = "AluraFlix Logo" />
            </Link>

            <Button as = { Link } className="ButtonLink" to = "/cadastro/Video">
                Novo vídeo
            </Button>
        </nav>
    );
}

export default Menu;