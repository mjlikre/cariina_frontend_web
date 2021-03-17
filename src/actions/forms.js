import { AUTH_USER, AUTH_ERROR, FORM_ERROR, GET_ALL_FORM, GET_FORM, FILLED_FORM, EDIT_FORM, MAKE_FORM } from "./types";
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

export const makeForm = (data, done) => async(dispatch) => {
    try{
        const res = await axios.post("http://localhost:3001/api/forms/create", data, {
            headers: { authorization: localStorage.getItem("token") },
          });
          dispatch({type: MAKE_FORM, payload: res.data})
          if (done){
              done()
          }
    }catch(error){
        if (!helperFunction(error, dispatch)){
            dispatch({type: FORM_ERROR, payload: "something went wrong, try again in a little bit"})
        }
        
    }
}
export const getAllForm = (data, done) => async(dispatch) => {
    try{
        const res = await axios.get("http://localhost:3001/api/forms/ge", {headers: {authorization: localStorage.getItem("token")}});
        dispatch({type: GET_ALL_FORM, payload: res.data})
        if (done){
            done()
        }
    }catch(error){
        if (!helperFunction(error, dispatch)){
            dispatch({type: FORM_ERROR, payload: "something went wrong, try again in a little bit"})
        }
    }
}
export const fillForm = (data, done) => async(dispatch) => {
    try{
        await axios.post(`http://localhost:3001/api/forms/fill/${data.form_id}`, data.data, {headers: {authorization: localStorage.getItem("token")}})
        if (done){
            done()
        }
    }catch(error){
        if (!helperFunction(error, dispatch)){
            dispatch({type: FORM_ERROR, payload: "something went wrong, try again in a little bit"})
        }
    }
}
export const getOneForm = (data, done) => async(dispatch) => {
    try{
        const res = await axios.get(`http://localhost:3001/api/forms/get/${data}`, {headers: {authorization: localStorage.getItem("token")}})
        dispatch({type: GET_FORM, payload: res.data})
        if (done){
            done()
        }
    }catch(error){
        if (!helperFunction(error, dispatch)){
            dispatch({type: FORM_ERROR, payload: "something went wrong, try again in a little bit"})
        }
    }
}

export const editForm = (data, done) => async(dispatch) => {
    try{
        const res = await axios.post(`http://localhost:3001/api/forms/edit/${data.form_id}`, data.data, {headers: {authorization: localStorage.getItem("token")}})
        dispatch({type: EDIT_FORM, payload: res.data})
        if (done) done()
    }catch(error){
        if (!helperFunction(error, dispatch)){
            dispatch({type: FORM_ERROR, payload: "something went wrong, try again in a little bit"})
        }
    }
}

export const fetchFilledForm = (done) => async(dispatch) => {
    try{
        const res = await axios.get(`http://localhost:3001/api/filled`, {headers: {authorization: localStorage.getItem("token")}})
        if (done) done()
        dispatch({type: FILLED_FORM, payload: res.data})
    }catch(error){
        if (!helperFunction(error, dispatch)){
            dispatch({type: FORM_ERROR, payload: "something went wrong, try again in a little bit"})
        }
    }
}


