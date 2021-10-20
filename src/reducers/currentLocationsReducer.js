import { UPDATE_LOCATION_IDS } from "../actions/types";

const currentLocationsReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_LOCATION_IDS:
      return {
        ...state,
        currentLocationIDs: action.payload,
      };

    default:
      return state;
  }
};

export default currentLocationsReducer;
