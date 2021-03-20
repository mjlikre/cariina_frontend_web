import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { signout } from "../../actions";

const PageHeader = (props) => {
  return (
    <>
      <Navbar className="navBar-color" expand="lg" variant="light">
        <Navbar.Brand href="#home">Cariina Interview</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/main">Main</Nav.Link>
            <Nav.Link href="/view">View Forms</Nav.Link>
            <Nav.Link href="#" onClick ={()=> {props.signout()}}>Sign Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className= "kjga-display-block ">
        {props.children}
      </div>
    </>
  )
};

export default connect(null, {signout})(PageHeader);
