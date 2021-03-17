import React from 'react'
import LoginForm from "../Components/Login/LoginForm"
const LogIn = (props) =>  {
    return (
        <div >
            {/* created a form submit box that takes in title and type, type 0 being signup and 1 being login */}
            <LoginForm title = "Log In" method = {1} redirect = {()=> {props.history.push("/main")}}/>
        </div>
    )
}

export default LogIn