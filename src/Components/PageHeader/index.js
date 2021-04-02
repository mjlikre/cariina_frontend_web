import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { signout } from "../../actions";

const PageHeader = ({history, signout, children}) => {
  return (
    <>
      <Navbar className="navBar-color" expand="lg" variant="dark" style = {{padding: "10px 100px"}}>
        <Navbar.Brand href="#home"><img src = "https://assets.website-files.com/5f9950c2348f39689e28b93d/5f9956808ea7480c33768d1c_logo.svg"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href = "/main">Home</Nav.Link>
          
           
          </Nav>
          <button className = "logout-button" onClick ={()=> {signout()}}>Sign Out</button>
        </Navbar.Collapse>
      </Navbar>

        {children}
     
    </>
  )
};

export default connect(null, {signout})(PageHeader);
