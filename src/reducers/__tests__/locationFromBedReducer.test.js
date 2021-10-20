import {
  FETCH_LOCATION_FROM_BED,
  FETCH_LOCATION_FROM_BED_FAILED,
  FETCH_LOCATION_FROM_BED_LOADING,
} from "../../actions/types";
import locationFromBedReducer from "../locationFromBedReducer";

const INITIAL_STATE = {
  locationDetails: {},
  loading: false,
  loaded: false,
  error: null,
};

describe("Location From Bed Reducer", () => {
  it("should return default state", () => {
    const newState = locationFromBedReducer(INITIAL_STATE, {});
    expect(newState).toEqual(INITIAL_STATE);
  });

  it("should update the state on loading", () => {
    const newState = locationFromBedReducer(INITIAL_STATE, {
      type: FETCH_LOCATION_FROM_BED_LOADING,
    });
    expect(newState).toEqual({
      locationDetails: {},
      loading: true,
      loaded: false,
      error: null,
    });
  });

  it("should update the state on loaded", () => {
    const newState = locationFromBedReducer(INITIAL_STATE, {
      type: FETCH_LOCATION_FROM_BED,
      payload: {
        bed: {
          b_CODE: "B",
          is_OCCUPIED: 1,
          b_ID: 6,
          rm_ID: 3,
        },
        room: {
          r_CODE: "ONC01",
          is_FULL: 1,
          r_ATTENDANT: 448802,
          r_TYPE: "GEN",
          loc_ID: 3,
          rm_ID: 3,
        },
        locationUnit: {
          build_ID: 2,
          loc_INCHARGE: 786541,
          loc_TYPE_ID: 1,
          loc_NAME: "BN ONC",
          loc_ID: 3,
        },
        patientSummary: {
          id: 4,
          admit_DATE: "2021-02-14",
          is_DISCHARGED: 0,
          dis_DATE: null,
          pat_ID: 4,
          b_ID: 6,
        },
      },
    });
    expect(newState).toEqual({
      locationDetails: {
        bed: {
          b_CODE: "B",
          is_OCCUPIED: 1,
          b_ID: 6,
          rm_ID: 3,
        },
        room: {
          r_CODE: "ONC01",
          is_FULL: 1,
          r_ATTENDANT: 448802,
          r_TYPE: "GEN",
          loc_ID: 3,
          rm_ID: 3,
        },
        locationUnit: {
          build_ID: 2,
          loc_INCHARGE: 786541,
          loc_TYPE_ID: 1,
          loc_NAME: "BN ONC",
          loc_ID: 3,
        },
        patientSummary: {
          id: 4,
          admit_DATE: "2021-02-14",
          is_DISCHARGED: 0,
          dis_DATE: null,
          pat_ID: 4,
          b_ID: 6,
        },
      },
      loading: false,
      loaded: true,
      error: null,
    });
  });

  it("should update the state on failed", () => {
    const newState = locationFromBedReducer(INITIAL_STATE, {
      type: FETCH_LOCATION_FROM_BED_FAILED,
      payload: "Error in loading location unit details, please try again",
    });
    expect(newState).toEqual({
      locationDetails: {},
      loading: false,
      loaded: true,
      error: "Error in loading location unit details, please try again",
    });
  });
});
