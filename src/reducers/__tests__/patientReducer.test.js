import {
  CREATE_PATIENT,
  CREATE_PATIENT_LOADING,
  CREATE_PATIENT_FAILED,
  RESET_CREATE_PATIENT_MESSAGE,
} from "../../actions/types";
import patientReducer from "../patientReducer";

describe("Patient Creation Reducer", () => {
  it("should return default state", () => {
    const newState = patientReducer(undefined, {});
    expect(newState).toEqual({});
  });

  it("should update the state on loading", () => {
    const newState = patientReducer(undefined, {
      type: CREATE_PATIENT_LOADING,
    });
    expect(newState).toEqual({
      loading: true,
      loaded: false,
      error: null,
    });
  });

  it("should update the state on loaded", () => {
    const newState = patientReducer(undefined, {
      type: CREATE_PATIENT,
      payload: {
        comments: null,
        pat_INSURANCE_ID: "DS123115",
        pat_HEIGHT: 181,
        pat_AGE: 21,
        pat_BLOODGROUP: "O+ve",
        pat_GENDER: "MALE",
        pat_WEIGHT: 81,
        pat_ADDRESS: "812 Payton Square River Lane",
        pat_DOB: "1973-08-14",
        pat_FIRSTNAME: "Raguraman",
        pat_CONTACT: "+917871821036",
        pat_EMAIL: "aakash@gmail.com",
        pat_LASTNAME: "T B",
        pat_ID: 91,
      },
    });
    expect(newState).toEqual({
      91: {
        comments: null,
        pat_INSURANCE_ID: "DS123115",
        pat_HEIGHT: 181,
        pat_AGE: 21,
        pat_BLOODGROUP: "O+ve",
        pat_GENDER: "MALE",
        pat_WEIGHT: 81,
        pat_ADDRESS: "812 Payton Square River Lane",
        pat_DOB: "1973-08-14",
        pat_FIRSTNAME: "Raguraman",
        pat_CONTACT: "+917871821036",
        pat_EMAIL: "aakash@gmail.com",
        pat_LASTNAME: "T B",
        pat_ID: 91,
      },
      loading: false,
      loaded: true,
      error: null,
    });
  });

  it("should update the state on failed", () => {
    const newState = patientReducer(undefined, {
      type: CREATE_PATIENT_FAILED,
      payload: {
        details: [
          {
            codes: [
              "NotEmpty.patient.PAT_FIRSTNAME",
              "NotEmpty.PAT_FIRSTNAME",
              "NotEmpty.java.lang.String",
              "NotEmpty",
            ],
            arguments: [
              {
                codes: ["patient.PAT_FIRSTNAME", "PAT_FIRSTNAME"],
                arguments: null,
                defaultMessage: "PAT_FIRSTNAME",
                code: "PAT_FIRSTNAME",
              },
            ],
            defaultMessage: "Patient's firstname should not be empty",
            objectName: "patient",
            field: "PAT_FIRSTNAME",
            rejectedValue: null,
            bindingFailure: false,
            code: "NotEmpty",
          },
          {
            codes: [
              "NotNull.patient.PAT_FIRSTNAME",
              "NotNull.PAT_FIRSTNAME",
              "NotNull.java.lang.String",
              "NotNull",
            ],
            arguments: [
              {
                codes: ["patient.PAT_FIRSTNAME", "PAT_FIRSTNAME"],
                arguments: null,
                defaultMessage: "PAT_FIRSTNAME",
                code: "PAT_FIRSTNAME",
              },
            ],
            defaultMessage: "Patient's firstname should not be null",
            objectName: "patient",
            field: "PAT_FIRSTNAME",
            rejectedValue: null,
            bindingFailure: false,
            code: "NotNull",
          },
        ],
      },
    });
    expect(newState).toEqual({
      loading: false,
      loaded: true,
      error: {
        details: [
          {
            codes: [
              "NotEmpty.patient.PAT_FIRSTNAME",
              "NotEmpty.PAT_FIRSTNAME",
              "NotEmpty.java.lang.String",
              "NotEmpty",
            ],
            arguments: [
              {
                codes: ["patient.PAT_FIRSTNAME", "PAT_FIRSTNAME"],
                arguments: null,
                defaultMessage: "PAT_FIRSTNAME",
                code: "PAT_FIRSTNAME",
              },
            ],
            defaultMessage: "Patient's firstname should not be empty",
            objectName: "patient",
            field: "PAT_FIRSTNAME",
            rejectedValue: null,
            bindingFailure: false,
            code: "NotEmpty",
          },
          {
            codes: [
              "NotNull.patient.PAT_FIRSTNAME",
              "NotNull.PAT_FIRSTNAME",
              "NotNull.java.lang.String",
              "NotNull",
            ],
            arguments: [
              {
                codes: ["patient.PAT_FIRSTNAME", "PAT_FIRSTNAME"],
                arguments: null,
                defaultMessage: "PAT_FIRSTNAME",
                code: "PAT_FIRSTNAME",
              },
            ],
            defaultMessage: "Patient's firstname should not be null",
            objectName: "patient",
            field: "PAT_FIRSTNAME",
            rejectedValue: null,
            bindingFailure: false,
            code: "NotNull",
          },
        ],
      },
    });
  });

  it("should reset the state", () => {
    const newState = patientReducer(undefined, {
      type: RESET_CREATE_PATIENT_MESSAGE,
    });
    expect(newState).toEqual({
      loading: false,
      loaded: false,
      error: null,
    });
  });
});
