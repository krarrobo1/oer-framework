import React, { useContext } from 'react'

import {
    Link,
    NavLink
} from 'react-router-dom';

import { GiBookCover } from 'react-icons/gi';
import { NETWORKS } from '../types/constants';

import NavBar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


export const SiteNav = () => {

    // const { web3 } = useContext(BlockchainContext);
    return (
        <NavBar bg="dark" expand="lg" variant="dark">
            <NavBar.Brand as={Link} to="/"><GiBookCover /> OER World</NavBar.Brand>
            <NavBar.Collapse bg="dark">
                <Nav>
                    <Nav.Link as={NavLink} exact to="/">Home</Nav.Link>
                    <Nav.Link as={NavLink} exact to="/about">About</Nav.Link>
                    <Nav.Link href="https://github.com/krarrobo1/oer-management">Github Repo</Nav.Link>
                    {/* <Nav.Link href="https://github.com/krarrobo1/oer-management">{NETWORKS[web3.networkId].name || 'UNKOWN'}</Nav.Link> */}
                </Nav>
            </NavBar.Collapse>
        </NavBar>
    )
}
