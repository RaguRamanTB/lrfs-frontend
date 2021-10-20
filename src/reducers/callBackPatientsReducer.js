import {
  FETCH_CALLBACK_PATIENTS,
  FETCH_CALLBACK_PATIENTS_FAILED,
  FETCH_CALLBACK_PATIENTS_LOADING,
} from "../actions/types";

const INITIAL_STATE = {
  callbackPatients: {},
  loading: false,
  loaded: false,
  error: null,
};

const callbackPatientsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CALLBACK_PATIENTS_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case FETCH_CALLBACK_PATIENTS:
      return {
        ...state,
        callbackPatients: action.payload,
        loading: false,
        loaded: true,
        error: null,
      };

    case FETCH_CALLBACK_PATIENTS_FAILED:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default callbackPatientsReducer;
