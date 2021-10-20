import { UPDATE_LOCATION_IDS } from "../../actions/types";
import currentLocationsReducer from "../currentLocationsReducer";

describe("Current Locations Reducer", () => {
  it("should return default state", () => {
    const newState = currentLocationsReducer(undefined, {});
    expect(newState).toEqual({});
  });

  it("should update the state", () => {
    const newState = currentLocationsReducer(undefined, {
      type: UPDATE_LOCATION_IDS,
      payload: "1,2,3,4,5",
    });
    expect(newState).toEqual({
      currentLocationIDs: "1,2,3,4,5",
    });
  });
});
