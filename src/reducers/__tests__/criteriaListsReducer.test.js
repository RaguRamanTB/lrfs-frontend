import {
  FETCH_CRITERIA_LIST,
  FETCH_CRITERIA_LIST_LOADING,
  FETCH_CRITERIA_LIST_FAILED,
} from "../../actions/types";
import criteriaListsReducer from "../criteriaListsReducer";

describe("Criteria Lists Reducer", () => {
  it("should return default state", () => {
    const newState = criteriaListsReducer(
      { criteriaListItems: {}, loading: false, loaded: false, error: null },
      {}
    );
    expect(newState).toEqual({
      criteriaListItems: {},
      loading: false,
      loaded: false,
      error: null,
    });
  });

  it("should update the state on loading", () => {
    const newState = criteriaListsReducer(
      { criteriaListItems: {}, loading: false, loaded: false, error: null },
      { type: FETCH_CRITERIA_LIST_LOADING }
    );
    expect(newState).toEqual({
      criteriaListItems: {},
      loading: true,
      loaded: false,
      error: null,
    });
  });

  it("should update the state on loaded", () => {
    const newState = criteriaListsReducer(
      { criteriaListItems: {}, loading: false, loaded: false, error: null },
      {
        type: FETCH_CRITERIA_LIST,
        payload: [
          {
            facilities: [
              {
                buildings: [
                  {
                    fc_ID: 1,
                    build_ID: 1,
                    build_NAME: "BE BLOCK",
                  },
                ],
                fc_NAME: "Baseline East Medical Center",
                org_ID: 1,
                fc_ID: 1,
              },
              {
                buildings: [
                  {
                    fc_ID: 2,
                    build_ID: 2,
                    build_NAME: "BN BLOCK",
                  },
                ],
                fc_NAME: "Baseline North Medical Center",
                org_ID: 1,
                fc_ID: 2,
              },
              {
                buildings: [
                  {
                    fc_ID: 4,
                    build_ID: 4,
                    build_NAME: "BW OLD BLOCK",
                  },
                ],
                fc_NAME: "Baseline West Medical Center",
                org_ID: 1,
                fc_ID: 4,
              },
              {
                buildings: [
                  {
                    fc_ID: 3,
                    build_ID: 3,
                    build_NAME: "BW NEW BLOCK",
                  },
                ],
                fc_NAME: "Baseline West Behavioral Health",
                org_ID: 1,
                fc_ID: 3,
              },
            ],
            cl_ID: 1,
            cl_NAME: "List A",
          },
          {
            facilities: [
              {
                buildings: [
                  {
                    fc_ID: 7,
                    build_ID: 7,
                    build_NAME: "BS NEW BLOCK",
                  },
                ],
                fc_NAME: "Baseline South Behavioral Health",
                org_ID: 1,
                fc_ID: 7,
              },
              {
                buildings: [
                  {
                    fc_ID: 5,
                    build_ID: 5,
                    build_NAME: "BE OLD BLOCK",
                  },
                ],
                fc_NAME: "Baseline North Behavioral Center",
                org_ID: 1,
                fc_ID: 5,
              },
              {
                buildings: [
                  {
                    fc_ID: 8,
                    build_ID: 8,
                    build_NAME: "BS OLD BLOCK",
                  },
                ],
                fc_NAME: "Baseline South Medical Center",
                org_ID: 1,
                fc_ID: 8,
              },
              {
                buildings: [
                  {
                    fc_ID: 6,
                    build_ID: 6,
                    build_NAME: "BE NEW BLOCK",
                  },
                ],
                fc_NAME: "Baseline East Behavioral Health",
                org_ID: 1,
                fc_ID: 6,
              },
            ],
            cl_ID: 2,
            cl_NAME: "List B",
          },
        ],
      }
    );
    expect(newState).toEqual({
      criteriaListItems: {
        1: {
          facilities: [
            {
              buildings: [
                {
                  fc_ID: 1,
                  build_ID: 1,
                  build_NAME: "BE BLOCK",
                },
              ],
              fc_NAME: "Baseline East Medical Center",
              org_ID: 1,
              fc_ID: 1,
            },
            {
              buildings: [
                {
                  fc_ID: 2,
                  build_ID: 2,
                  build_NAME: "BN BLOCK",
                },
              ],
              fc_NAME: "Baseline North Medical Center",
              org_ID: 1,
              fc_ID: 2,
            },
            {
              buildings: [
                {
                  fc_ID: 4,
                  build_ID: 4,
                  build_NAME: "BW OLD BLOCK",
                },
              ],
              fc_NAME: "Baseline West Medical Center",
              org_ID: 1,
              fc_ID: 4,
            },
            {
              buildings: [
                {
                  fc_ID: 3,
                  build_ID: 3,
                  build_NAME: "BW NEW BLOCK",
                },
              ],
              fc_NAME: "Baseline West Behavioral Health",
              org_ID: 1,
              fc_ID: 3,
            },
          ],
          cl_ID: 1,
          cl_NAME: "List A",
        },
        2: {
          facilities: [
            {
              buildings: [
                {
                  fc_ID: 7,
                  build_ID: 7,
                  build_NAME: "BS NEW BLOCK",
                },
              ],
              fc_NAME: "Baseline South Behavioral Health",
              org_ID: 1,
              fc_ID: 7,
            },
            {
              buildings: [
                {
                  fc_ID: 5,
                  build_ID: 5,
                  build_NAME: "BE OLD BLOCK",
                },
              ],
              fc_NAME: "Baseline North Behavioral Center",
              org_ID: 1,
              fc_ID: 5,
            },
            {
              buildings: [
                {
                  fc_ID: 8,
                  build_ID: 8,
                  build_NAME: "BS OLD BLOCK",
                },
              ],
              fc_NAME: "Baseline South Medical Center",
              org_ID: 1,
              fc_ID: 8,
            },
            {
              buildings: [
                {
                  fc_ID: 6,
                  build_ID: 6,
                  build_NAME: "BE NEW BLOCK",
                },
              ],
              fc_NAME: "Baseline East Behavioral Health",
              org_ID: 1,
              fc_ID: 6,
            },
          ],
          cl_ID: 2,
          cl_NAME: "List B",
        },
      },
      loading: false,
      loaded: true,
      error: null,
    });
  });

  it("should update the state on failed", () => {
    const newState = criteriaListsReducer(
      { criteriaListItems: {}, loading: false, loaded: false, error: null },
      {
        type: FETCH_CRITERIA_LIST_FAILED,
        payload: "Error in loading criteria lists, please try again",
      }
    );
    expect(newState).toEqual({
      criteriaListItems: {},
      loading: false,
      loaded: true,
      error: "Error in loading criteria lists, please try again",
    });
  });
});
