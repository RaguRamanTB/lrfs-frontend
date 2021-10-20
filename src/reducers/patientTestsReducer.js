import {
  FETCH_TESTS_PATIENTS,
  FETCH_TESTS_PATIENTS_FAILED,
  FETCH_TESTS_PATIENTS_LOADING,
} from "../actions/types";

const INITIAL_STATE = {
  patientTests: {},
  loading: false,
  loaded: false,
  error: null,
};

const patientTestsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TESTS_PATIENTS_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case FETCH_TESTS_PATIENTS:
      return {
        ...state,
        patientTests: action.payload,
        loading: false,
        loaded: true,
        error: null,
      };

    case FETCH_TESTS_PATIENTS_FAILED:
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

export default patientTestsReducer;
