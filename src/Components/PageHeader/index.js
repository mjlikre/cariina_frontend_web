import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { signout } from "../../actions";

const PageHeader = ({history, signout, children}) => {
  return (
    <>
      <Navbar className="navBar-color" expand="lg" variant="light">
        <Navbar.Brand href="#home">Cariina Forms</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href = "/main">Home</Nav.Link>
          
           
          </Nav>
          <button onClick ={()=> {signout()}}>Sign Out</button>
        </Navbar.Collapse>
      </Navbar>

        {children}
     
    </>
  )
};

export default connect(null, {signout})(PageHeader);
