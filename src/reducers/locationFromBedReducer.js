import {
  FETCH_LOCATION_FROM_BED,
  FETCH_LOCATION_FROM_BED_FAILED,
  FETCH_LOCATION_FROM_BED_LOADING,
} from "../actions/types";

const INITIAL_STATE = {
  locationDetails: {},
  loading: false,
  loaded: false,
  error: null,
};

const locationFromBedReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LOCATION_FROM_BED_LOADING:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case FETCH_LOCATION_FROM_BED:
      return {
        ...state,
        locationDetails: action.payload,
        loading: false,
        loaded: true,
        error: null,
      };

    case FETCH_LOCATION_FROM_BED_FAILED:
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

export default locationFromBedReducer;
