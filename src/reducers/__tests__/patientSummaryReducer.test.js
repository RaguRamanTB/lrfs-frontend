import {
  FETCH_PATIENT_SUMMARY,
  FETCH_PATIENT_SUMMARY_FAILED,
  FETCH_PATIENT_SUMMARY_LOADING,
} from "../../actions/types";
import patientSummaryReducer from "../patientSummaryReducer";

const INITIAL_STATE = {
  patientSummary: {},
  loading: false,
  loaded: false,
  error: null,
};

describe("Patient Summary Reducer", () => {
  it("should return default state", () => {
    const newState = patientSummaryReducer(INITIAL_STATE, {});
    expect(newState).toEqual(INITIAL_STATE);
  });

  it("should update the state on loading", () => {
    const newState = patientSummaryReducer(INITIAL_STATE, {
      type: FETCH_PATIENT_SUMMARY_LOADING,
    });
    expect(newState).toEqual({
      patientSummary: {},
      loading: true,
      loaded: false,
      error: null,
    });
  });

  it("should update the state on loaded", () => {
    const newState = patientSummaryReducer(INITIAL_STATE, {
      type: FETCH_PATIENT_SUMMARY,
      payload: [
        {
          id: 10,
          admit_DATE: "2021-02-15",
          is_DISCHARGED: 1,
          dis_DATE: "2021-02-18",
          pat_ID: 10,
          b_ID: 14,
        },
      ],
    });
    expect(newState).toEqual({
      patientSummary: [
        {
          id: 10,
          admit_DATE: "2021-02-15",
          is_DISCHARGED: 1,
          dis_DATE: "2021-02-18",
          pat_ID: 10,
          b_ID: 14,
        },
      ],
      loading: false,
      loaded: true,
      error: null,
    });
  });

  it("should update the state on failed", () => {
    const newState = patientSummaryReducer(INITIAL_STATE, {
      type: FETCH_PATIENT_SUMMARY_FAILED,
      payload: "Error in loading patient's summary, please try again",
    });
    expect(newState).toEqual({
      patientSummary: {},
      loading: false,
      loaded: true,
      error: "Error in loading patient's summary, please try again",
    });
  });
});
