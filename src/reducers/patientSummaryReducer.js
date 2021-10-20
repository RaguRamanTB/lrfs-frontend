import {
  FETCH_PATIENT_SUMMARY,
  FETCH_PATIENT_SUMMARY_FAILED,
  FETCH_PATIENT_SUMMARY_LOADING,
} from "../actions/types";

const INITIAL_STATE = {
  patientSummary: {},
  loading: false,
  loaded: false,
  error: null,
};

const patientSummaryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PATIENT_SUMMARY_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case FETCH_PATIENT_SUMMARY:
      return {
        ...state,
        patientSummary: action.payload,
        loading: false,
        loaded: true,
        error: null,
      };

    case FETCH_PATIENT_SUMMARY_FAILED:
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

export default patientSummaryReducer;
