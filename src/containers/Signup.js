import React from 'react'
import LoginForm from "../Components/Login/LoginForm"
const Signup = (props) =>  {
    return (
        <div >
            {/* created a form submit box that takes in title and type, type 0 being signup and 1 being login */}
            <LoginForm title = "Sign Up" method = {0} redirect = {()=>{props.history.push("/")}}/>

        </div>
    )
}

export default Signup