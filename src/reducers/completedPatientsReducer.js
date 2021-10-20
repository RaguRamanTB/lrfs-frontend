import {
  FETCH_COMPLETED_PATIENTS,
  FETCH_COMPLETED_PATIENTS_LOADING,
  FETCH_COMPLETED_PATIENTS_FAILED,
} from "../actions/types";

const INITIAL_STATE = {
  completedPatients: {},
  loading: false,
  loaded: false,
  error: null,
};

const completedPatientsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COMPLETED_PATIENTS_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case FETCH_COMPLETED_PATIENTS:
      return {
        ...state,
        completedPatients: action.payload,
        loading: false,
        loaded: true,
        error: null,
      };

    case FETCH_COMPLETED_PATIENTS_FAILED:
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

export default completedPatientsReducer;
