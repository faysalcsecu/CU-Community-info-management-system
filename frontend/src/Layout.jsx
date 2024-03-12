import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
// import WelcomePage from '../pages/WelcomePage';
function Layout({ children }) {
    return (
        <div>
            <Navbar style={{  background:  'linear-gradient(to right, black, blue)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} expand="lg">
                <Navbar.Brand style={{ fontFamily: 'Arial', fontSize: '30px', fontWeight: 'bold', color: '#fff' }} href="#home">University Of Chittagong Info</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/">
                            <Nav.Link>WelcomePage</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/students">
                            <Nav.Link>Students</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/teachers">
                            <Nav.Link>Teachers</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/staffs">
                            <Nav.Link>Staff</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav>
                        <LinkContainer to="/register/student">
                            <Nav.Link>Register as Student</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/register/teacher">
                            <Nav.Link>Register as Teacher</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/register/staff">
                            <Nav.Link>Register as Staff</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/admin/login">
                            <Nav.Link>Admin</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
          
            {children}
        </div>
    );
}

export default Layout;
