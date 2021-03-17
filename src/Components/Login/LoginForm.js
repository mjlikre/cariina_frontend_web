import React, {useState} from 'react'
import { compose } from "redux";
import { connect } from "react-redux";
import { signin, signup } from "../../actions";
import { Form, Button } from "react-bootstrap";

//loginform, takes in 3 props: title, method, redirect. title takes in a string, the method one takes in and integer 0 or 1, 
//where 1 is for login and 0 is for signup, and redirect takes in a function to redirect the page. Due to the method use to 
// redirect (props.history.push), it can't seem to work in a child component.

// look into Login or Signup file in containers for sample usecase. 
const LoginBox = (props) => {
    const [authInput, setAuthInput] = useState({
        email: "",
        password: ""
    })
    const login = () => {
        props.signin(authInput, () => {
            props.redirect()
          });
    }
    const signup = () => {
        props.signup(authInput, () => {
            props.redirect()
          });
    }
    return (
            <div
            style={{
              alignContent: "center",
              width: "100%",
              position: "absolute",
              top: "150px",
              opacity: "0.8",
            }}
          >
              <div className="login-container" style = {{maxWidth: "500px"}}>
                <div style={{ textAlign: "center" }}>
                  <h2>{props.title}</h2>
                  <div className = "errorMessage"> {props.errorMessage ? "Incorrect Email or Password" : null}</div>
                </div>

                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="username"
                      placeholder="Enter your username"
                      onChange={(e) => {
                        setAuthInput({...authInput, email: e.target.value})
                      }}
                      autoComplete="off"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your Password"
                      onChange={(e) => {
                        setAuthInput({...authInput, password: e.target.value})
                      }}
                      autoComplete="off"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    onClick={() => {
                      {!props.method ? signup() : login()}
                    }}
                  >
                    {!props.method ? "Sign Up" : "Log In"}
                  </Button>
                  <br></br>
                  <br></br>
                  <Button
                    variant="tertiary"
                  >
                    <a href = {!props.method ? "/login" : "/signup"}>{!props.method ? "Already a user? Log In!" : "New? Sign Up!"}</a>
                  </Button>
                </Form>
                
              </div>
            </div>
            

    )
}

const mapStateToProps = (state) => {
    return {
      errorMessage: state.auth.errorMessage,
    };
  }

  export default compose(connect(mapStateToProps, { signin, signup }))(LoginBox);
