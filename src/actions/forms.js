import {
  AUTH_USER,
  FORM_ERROR,
  GET_ALL_FORM,
  GET_FORM,
  FILLED_FORM,

} from "./types";
import axios from "axios";


const helperFunction = (error, dispatch) => {
  // created an helper function, takes in the error and dispatch. The backend server will always respond with an authenticated field, setting it to true or false. When a
  // user's token is expired or if it's simply a wrong token, the server will respond with {authenticated: false}. however with server internal errors, it will respond with
  // {authentication: true}. This function checks the authenticated field in the error.response.data object, if it's false then it will clear the token that is in local storage
  // and then clear redux of the previous token, forcing users to signout.
  if (error.response.data) {
    if (!error.response.data.authenticated) {
      localStorage.removeItem("token");
      dispatch({ type: AUTH_USER, payload: null });
      return true;
    }
  } else {
    return false;
  }
};

export const makeForm = (data, done) => async (dispatch) => {
  /* Make form action, takes in an object as data. The data object needs to have 2 fields: timeCreated and data, with the former parameter being a number and the latter being a string
    data is used to set the title of the form
    sample data input: 
    data = {
        timeCreated: 12345, 
        data: "new form"
    }
    */
  try {
    const res = await axios.post(
      "https://cariina-backend.herokuapp.com/api/forms/create",
      data,
      {
        headers: { authorization: localStorage.getItem("token") },
      }
    );
    dispatch({ type: GET_ALL_FORM, payload: res.data.data });
    if (done) {
      done();
    }
  } catch (error) {
    console.log(error);
    if (!helperFunction(error, dispatch)) {
      dispatch({
        type: FORM_ERROR,
        payload: "something went wrong, try again in a little bit",
      });
    }
  }
};
export const getAllForm = (done) => async (dispatch) => {
  /* this action can be called to get all the forms that was created by the same user, no need of passing in id or anything alse, becase the token that is being sent in the headers 
    already includes it */
  try {
    const res = await axios.get("https://cariina-backend.herokuapp.com/api/forms/get", {
      headers: { authorization: localStorage.getItem("token") },
    });
    dispatch({ type: GET_ALL_FORM, payload: res.data.data });
    if (done) {
      done();
    }
  } catch (error) {
    if (!helperFunction(error, dispatch)) {
      dispatch({
        type: FORM_ERROR,
        payload: "something went wrong, try again in a little bit",
      });
    }
  }
};
export const fillForm = (data, done) => async (dispatch) => {
  console.log(data, "action")
  try {
    await axios.post(
      `https://cariina-backend.herokuapp.com/api/forms/fill/${data.form_id}`,
      data.data,
      { headers: { authorization: localStorage.getItem("token") } }
    );
    if (done) {
      done();
    }
  } catch (error) {
    if (!helperFunction(error, dispatch)) {
      dispatch({
        type: FORM_ERROR,
        payload: "something went wrong, try again in a little bit",
      });
    }
  }
};
export const getFormToFill = (data, done) => async (dispatch) => {
  try {
    const res = await axios.get(`https://cariina-backend.herokuapp.com/api/forms/get/${data}`);
    dispatch({ type: GET_FORM, payload: res.data.data });
    if (done) {
      done();
    }
  } catch (error) {
    if (!helperFunction(error, dispatch)) {
      dispatch({
        type: FORM_ERROR,
        payload: "something went wrong, try again in a little bit",
      });
    }
  }
};


export const editForm = (data, done) => async (dispatch) => {
  try {
    const res = await axios.post(
      `https://cariina-backend.herokuapp.com/api/forms/edit/${data.id}`,
      data.data,
      { headers: { authorization: localStorage.getItem("token") } }
    );
    
    dispatch({ type: GET_ALL_FORM, payload: res.data.data });
    if (done) done();
  } catch (error) {
    if (!helperFunction(error, dispatch)) {
      dispatch({
        type: FORM_ERROR,
        payload: "something went wrong, try again in a little bit",
      });
    }
  }
};

export const fetchFilledForm = (data, done) => async (dispatch) => {
  try {
    const res = await axios.get(`https://cariina-backend.herokuapp.com/api/forms/filled/${data}`, {
      headers: { authorization: localStorage.getItem("token") },
    });
    if (done) done();
    dispatch({ type: FILLED_FORM, payload: res.data.data });
  } catch (error) {
    if (!helperFunction(error, dispatch)) {
      dispatch({
        type: FORM_ERROR,
        payload: "something went wrong, try again in a little bit",
      });
    }
  }
};

export const deleteForm = (data, done) => async(dispatch)=> {
  try{
    const res = await axios.get(`https://cariina-backend.herokuapp.com/api/forms/delete/${data}`, {
      headers: { authorization: localStorage.getItem("token") },
    });
    if (done) done();
    dispatch({ type: GET_ALL_FORM, payload: res.data.data });
  }catch (error) {
    if (!helperFunction(error, dispatch)) {
      dispatch({
        type: FORM_ERROR,
        payload: "something went wrong, try again in a little bit",
      });
    }
  }
}

export const changeFormStyle = (data, done) => async(dispatch) => {
  try{
    const res = await axios.post(`https://cariina-backend.herokuapp.com/api/forms/style/${data.id}`, data.styles, {
      headers: { authorization: localStorage.getItem("token") },
    });
    if (done) done();
    dispatch({ type: GET_ALL_FORM, payload: res.data.data})
  }catch(error) {
    if (!helperFunction(error, dispatch)) {
      dispatch({
        type: FORM_ERROR,
        payload: "something went wrong, try again in a little bit",
      });
    }
  }
}
