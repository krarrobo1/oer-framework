import React from 'react'

import {
    Link,
    NavLink
} from 'react-router-dom';

import { GiBookCover } from 'react-icons/gi';

import NavBar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


export const SiteNav = () => {
    return (
        <NavBar bg="dark" expand="lg" variant="dark">
            <NavBar.Brand as={Link} to="/"><GiBookCover /> OER World</NavBar.Brand>
            <NavBar.Collapse bg="dark">
                <Nav>
                    <Nav.Link as={NavLink} exact to="/">Home</Nav.Link>
                    <Nav.Link as={NavLink} exact to="/about">About</Nav.Link>
                    <Nav.Link href="https://github.com/krarrobo1/oer-framework">Code Repo</Nav.Link>
                </Nav>
            </NavBar.Collapse>
        </NavBar>
    )
}
