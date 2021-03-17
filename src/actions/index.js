import { AUTH_USER, AUTH_ERROR } from "./types";
import axios from "axios";

const helperFunction = (error, dispatch) => {
  if (error.response.data){
      if (!error.response.data.authenticated){
        localStorage.removeItem("token")
        dispatch({type: AUTH_USER, payload: null})
        return true
      }
  }
  else{
      return false
  }
}

export const signup = (data, done) => async (dispatch) => {
  //signup. takes in 2 parameters, data (the data to sent to the api) and done(callback function). data is an object that has two keys, 
  // email and password
  try {
    const res = await axios.post("http://localhost:3001/api/auth/signup", data);
    dispatch({ type: AUTH_USER, payload: res.data.token });
    localStorage.setItem("token", res.data.token);
    
    if (done) {
      done()
    }
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

export const signout = (done) => {
  // signout action
  localStorage.removeItem("token")
  if (done) {
    done()
  }
  return {
    type: AUTH_USER,
    payload: null,
  };
};

export const signin = (formProps, done) => async (dispatch) => {
   //signin. takes in 2 parameters, data (the data to sent to the api) and done(callback function). data is an object that has two keys, 
  // email and password
  try {
    const res = await axios.post("http://localhost:3001/api/auth/signin", formProps);
    localStorage.setItem("token", res.data.token);
    dispatch({ type: AUTH_USER, payload: res.data.token });
    if (done) {
      done()
    }
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: AUTH_ERROR, payload: "err" });
  }
};

export const test =() => async(dispatch) => {
  try{
    await axios.get("http://localhost:3001/api/test", {headers: {authorization: localStorage.getItem("token")}})
  }catch(error){
    if (!helperFunction(error, dispatch)){
      console.log("lol")
    }
  }
}
