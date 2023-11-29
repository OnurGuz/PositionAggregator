import React from 'react';
import { Navbar, Nav, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';


const AppNavbar = () => {
    return (
        <Navbar color="dark" dark expand="md">
            <Nav className="mr-auto" navbar>
                <NavItem>
                    <NavLink to="/" className="nav-link">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/trades" className="nav-link">Trades</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/positions" className="nav-link">Positions</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/createTrade" className="nav-link">Create Trade</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default AppNavbar;