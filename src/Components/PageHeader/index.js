import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { signout } from "../../actions";

const PageHeader = ({history, signout, children}) => {
  return (
    <>
      <Navbar className="navBar-color" expand="lg" variant="light">
        <Navbar.Brand href="#home">Cariina Interview</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick = {()=> {history.push("/main")}}>Home</Nav.Link>
          
            <Nav.Link onClick ={()=> {signout()}}>Sign Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className= "kjga-display-block ">
        {children}
      </div>
    </>
  )
};

export default connect(null, {signout})(PageHeader);
