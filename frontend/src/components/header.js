import React from 'react';
import {Container, Navbar} from 'react-bootstrap';
import {ReactComponent as Logo} from "../images/logo.svg";

const navbarStyle = {
    backgroundColor: 'lightgrey'
};

const Header = ({title}) => {
    return (
        <Navbar style={navbarStyle} variant="light">
            <Container>
                {/*<Navbar.Brand href="/">{title}</Navbar.Brand>*/}
                <Logo alt={title} style={{maxWidth:'22rem', maxHeight: '4rem'}}/>
            </Container>
        </Navbar>

    )
};

export default Header;