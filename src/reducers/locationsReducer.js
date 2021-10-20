import { FETCH_LOCATIONS, FETCH_LOCATIONS_FAILED } from "../actions/types";

const INITIAL_STATE = {
  locations: {},
  loading: false,
  loaded: false,
  error: null,
};

const locationsReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
        loading: false,
        loaded: true,
        error: null,
      };

    case FETCH_LOCATIONS_FAILED:
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

export default locationsReducers;
