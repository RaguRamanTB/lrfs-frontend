import {
  CREATE_PATIENT,
  CREATE_PATIENT_LOADING,
  CREATE_PATIENT_FAILED,
  RESET_CREATE_PATIENT_MESSAGE,
} from "../actions/types";

const patientReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PATIENT_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case CREATE_PATIENT:
      return {
        ...state,
        [action.payload.pat_ID]: action.payload,
        loading: false,
        loaded: true,
        error: null,
      };

    case CREATE_PATIENT_FAILED:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.payload,
      };

    case RESET_CREATE_PATIENT_MESSAGE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: null,
      };

    default:
      return state;
  }
};

export default patientReducer;
