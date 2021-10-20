import { FETCH_LOCATIONS, FETCH_LOCATIONS_FAILED } from "../../actions/types";
import locationsReducers from "../locationsReducer";

const INITIAL_STATE = {
  locations: {},
  loading: false,
  loaded: false,
  error: null,
};

describe("Locations Reducer", () => {
  it("should return default state", () => {
    const newState = locationsReducers(INITIAL_STATE, {});
    expect(newState).toEqual(INITIAL_STATE);
  });

  it("should update the state on loaded", () => {
    const newState = locationsReducers(INITIAL_STATE, {
      type: FETCH_LOCATIONS,
      payload: [
        {
          build_ID: 1,
          loc_INCHARGE: 123098,
          loc_TYPE_ID: 1,
          loc_NAME: "BE PSY",
          loc_ID: 1,
        },
        {
          build_ID: 1,
          loc_INCHARGE: 456234,
          loc_TYPE_ID: 2,
          loc_NAME: "BE ED 1",
          loc_ID: 2,
        },
        {
          build_ID: 2,
          loc_INCHARGE: 786541,
          loc_TYPE_ID: 1,
          loc_NAME: "BN ONC",
          loc_ID: 3,
        },
        {
          build_ID: 2,
          loc_INCHARGE: 896522,
          loc_TYPE_ID: 2,
          loc_NAME: "BN ICU",
          loc_ID: 4,
        },
      ],
    });
    expect(newState).toEqual({
      locations: [
        {
          build_ID: 1,
          loc_INCHARGE: 123098,
          loc_TYPE_ID: 1,
          loc_NAME: "BE PSY",
          loc_ID: 1,
        },
        {
          build_ID: 1,
          loc_INCHARGE: 456234,
          loc_TYPE_ID: 2,
          loc_NAME: "BE ED 1",
          loc_ID: 2,
        },
        {
          build_ID: 2,
          loc_INCHARGE: 786541,
          loc_TYPE_ID: 1,
          loc_NAME: "BN ONC",
          loc_ID: 3,
        },
        {
          build_ID: 2,
          loc_INCHARGE: 896522,
          loc_TYPE_ID: 2,
          loc_NAME: "BN ICU",
          loc_ID: 4,
        },
      ],
      loading: false,
      loaded: true,
      error: null,
    });
  });

  it("should update the state on failed", () => {
    const newState = locationsReducers(INITIAL_STATE, {
      type: FETCH_LOCATIONS_FAILED,
      payload: "Error in loading locations, please try again",
    });
    expect(newState).toEqual({
      locations: {},
      loading: false,
      loaded: true,
      error: "Error in loading locations, please try again",
    });
  });
});
