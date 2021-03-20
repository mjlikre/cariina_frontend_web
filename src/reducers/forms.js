import {
  FORM_ERROR,
  GET_ALL_FORM,
  GET_FORM,
  EDIT_FORM,
  MAKE_FORM,
  FILLED_FORM,
  DELETE_FORM
} from "../actions/types";

const INITIAL_STATE = {
  formError: "",
  allForms: [],
  form: "",
  filledForms: "",
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FORM_ERROR:
      return { ...state, formError: action.payload };
    case GET_ALL_FORM:
      return { ...state, allForms: action.payload };
    case MAKE_FORM:
      return { ...state, allForms: [...state.allForms, action.payload] };
    case GET_FORM:
      return { ...state, form: action.payload };
    case EDIT_FORM:
      return { ...state, allForms: action.payload };
    case FILLED_FORM:
      return { ...state, filledForms: action.payload };
    case DELETE_FORM:
        return { ...state, allForms: action.payload };
    default:
      return state;
  }
}
