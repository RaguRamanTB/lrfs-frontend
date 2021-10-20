import {
  FETCH_TESTS_PATIENTS,
  FETCH_TESTS_PATIENTS_FAILED,
  FETCH_TESTS_PATIENTS_LOADING,
} from "../../actions/types";
import patientTestsReducer from "../patientTestsReducer";

const INITIAL_STATE = {
  patientTests: {},
  loading: false,
  loaded: false,
  error: null,
};

describe("Patient Tests Reducer", () => {
  it("should return default state", () => {
    const newState = patientTestsReducer(INITIAL_STATE, {});
    expect(newState).toEqual(INITIAL_STATE);
  });

  it("should update the state on loading", () => {
    const newState = patientTestsReducer(INITIAL_STATE, {
      type: FETCH_TESTS_PATIENTS_LOADING,
    });
    expect(newState).toEqual({
      patientTests: {},
      loading: true,
      loaded: false,
      error: null,
    });
  });

  it("should update the state on loaded", () => {
    const newState = patientTestsReducer(INITIAL_STATE, {
      type: FETCH_TESTS_PATIENTS,
      payload: [
        {
          patient: {
            comments: [
              {
                id: 10,
                patId: 10,
                status: "No Status Found",
                comment: "No Comment Found",
                commented_AT: "2021-03-11T11:47:13.000+00:00",
              },
              {
                id: 64,
                patId: 10,
                status: "Mark callback incomplete",
                comment: "Test errors",
                commented_AT: "2021-03-16T05:17:04.000+00:00",
              },
              {
                id: 66,
                patId: 10,
                status:
                  "Reviewed by Provider, No further action required. Patient Contacted",
                comment: "Patient informed via Phone",
                commented_AT: "2021-03-16T13:25:18.000+00:00",
              },
            ],
            pat_INSURANCE_ID: "AH890890",
            pat_HEIGHT: 174,
            pat_AGE: 22,
            pat_BLOODGROUP: "A+ve",
            pat_GENDER: "FEMALE",
            pat_WEIGHT: 94,
            pat_ADDRESS: "894 Ritchie Land",
            pat_DOB: "1999-10-10",
            pat_FIRSTNAME: "Amiya",
            pat_CONTACT: "+919413812129",
            pat_EMAIL: "dberge@hotmail.com",
            pat_LASTNAME: "Hoeger",
            pat_ID: 10,
          },
          t_RESULT: "31",
          t_NAME: "SpO2",
          t_DATE: "2021-02-17",
          t_CATEGORY: "RADIOLOGY",
          t_UNITS: "%",
          t_MOD_AT: "2021-02-17T07:34:35.000+00:00",
          t_STATUS: "No Status Found",
          is_NOTIFIED: 1,
          t_ID: 37,
          doc_ID: 168194,
          t_COMMENT: "No Comment Found",
          normal_RANGE: "--",
          pat_ID: 10,
        },
        {
          patient: {
            comments: [
              {
                id: 10,
                patId: 10,
                status: "No Status Found",
                comment: "No Comment Found",
                commented_AT: "2021-03-11T11:47:13.000+00:00",
              },
              {
                id: 64,
                patId: 10,
                status: "Mark callback incomplete",
                comment: "Test errors",
                commented_AT: "2021-03-16T05:17:04.000+00:00",
              },
              {
                id: 66,
                patId: 10,
                status:
                  "Reviewed by Provider, No further action required. Patient Contacted",
                comment: "Patient informed via Phone",
                commented_AT: "2021-03-16T13:25:18.000+00:00",
              },
            ],
            pat_INSURANCE_ID: "AH890890",
            pat_HEIGHT: 174,
            pat_AGE: 22,
            pat_BLOODGROUP: "A+ve",
            pat_GENDER: "FEMALE",
            pat_WEIGHT: 94,
            pat_ADDRESS: "894 Ritchie Land",
            pat_DOB: "1999-10-10",
            pat_FIRSTNAME: "Amiya",
            pat_CONTACT: "+919413812129",
            pat_EMAIL: "dberge@hotmail.com",
            pat_LASTNAME: "Hoeger",
            pat_ID: 10,
          },
          t_RESULT: "54",
          t_NAME: "Oxygen Flow Rate",
          t_DATE: "2021-02-17",
          t_CATEGORY: "RADIOLOGY",
          t_UNITS: "L/min",
          t_MOD_AT: "2021-02-17T07:34:37.000+00:00",
          t_STATUS: "No Status Found",
          is_NOTIFIED: 1,
          t_ID: 38,
          doc_ID: 168194,
          t_COMMENT: "No Comment Found",
          normal_RANGE: "--",
          pat_ID: 10,
        },
      ],
    });
    expect(newState).toEqual({
      patientTests: [
        {
          patient: {
            comments: [
              {
                id: 10,
                patId: 10,
                status: "No Status Found",
                comment: "No Comment Found",
                commented_AT: "2021-03-11T11:47:13.000+00:00",
              },
              {
                id: 64,
                patId: 10,
                status: "Mark callback incomplete",
                comment: "Test errors",
                commented_AT: "2021-03-16T05:17:04.000+00:00",
              },
              {
                id: 66,
                patId: 10,
                status:
                  "Reviewed by Provider, No further action required. Patient Contacted",
                comment: "Patient informed via Phone",
                commented_AT: "2021-03-16T13:25:18.000+00:00",
              },
            ],
            pat_INSURANCE_ID: "AH890890",
            pat_HEIGHT: 174,
            pat_AGE: 22,
            pat_BLOODGROUP: "A+ve",
            pat_GENDER: "FEMALE",
            pat_WEIGHT: 94,
            pat_ADDRESS: "894 Ritchie Land",
            pat_DOB: "1999-10-10",
            pat_FIRSTNAME: "Amiya",
            pat_CONTACT: "+919413812129",
            pat_EMAIL: "dberge@hotmail.com",
            pat_LASTNAME: "Hoeger",
            pat_ID: 10,
          },
          t_RESULT: "31",
          t_NAME: "SpO2",
          t_DATE: "2021-02-17",
          t_CATEGORY: "RADIOLOGY",
          t_UNITS: "%",
          t_MOD_AT: "2021-02-17T07:34:35.000+00:00",
          t_STATUS: "No Status Found",
          is_NOTIFIED: 1,
          t_ID: 37,
          doc_ID: 168194,
          t_COMMENT: "No Comment Found",
          normal_RANGE: "--",
          pat_ID: 10,
        },
        {
          patient: {
            comments: [
              {
                id: 10,
                patId: 10,
                status: "No Status Found",
                comment: "No Comment Found",
                commented_AT: "2021-03-11T11:47:13.000+00:00",
              },
              {
                id: 64,
                patId: 10,
                status: "Mark callback incomplete",
                comment: "Test errors",
                commented_AT: "2021-03-16T05:17:04.000+00:00",
              },
              {
                id: 66,
                patId: 10,
                status:
                  "Reviewed by Provider, No further action required. Patient Contacted",
                comment: "Patient informed via Phone",
                commented_AT: "2021-03-16T13:25:18.000+00:00",
              },
            ],
            pat_INSURANCE_ID: "AH890890",
            pat_HEIGHT: 174,
            pat_AGE: 22,
            pat_BLOODGROUP: "A+ve",
            pat_GENDER: "FEMALE",
            pat_WEIGHT: 94,
            pat_ADDRESS: "894 Ritchie Land",
            pat_DOB: "1999-10-10",
            pat_FIRSTNAME: "Amiya",
            pat_CONTACT: "+919413812129",
            pat_EMAIL: "dberge@hotmail.com",
            pat_LASTNAME: "Hoeger",
            pat_ID: 10,
          },
          t_RESULT: "54",
          t_NAME: "Oxygen Flow Rate",
          t_DATE: "2021-02-17",
          t_CATEGORY: "RADIOLOGY",
          t_UNITS: "L/min",
          t_MOD_AT: "2021-02-17T07:34:37.000+00:00",
          t_STATUS: "No Status Found",
          is_NOTIFIED: 1,
          t_ID: 38,
          doc_ID: 168194,
          t_COMMENT: "No Comment Found",
          normal_RANGE: "--",
          pat_ID: 10,
        },
      ],
      loading: false,
      loaded: true,
      error: null,
    });
  });

  it("should update the state on failed", () => {
    const newState = patientTestsReducer(INITIAL_STATE, {
      type: FETCH_TESTS_PATIENTS_FAILED,
      payload: "Error in loading patient's lab test details, please try again",
    });
    expect(newState).toEqual({
      patientTests: {},
      loading: false,
      loaded: true,
      error: "Error in loading patient's lab test details, please try again",
    });
  });
});
