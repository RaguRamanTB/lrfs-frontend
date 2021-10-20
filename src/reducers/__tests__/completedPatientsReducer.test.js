import {
  FETCH_COMPLETED_PATIENTS,
  FETCH_COMPLETED_PATIENTS_LOADING,
  FETCH_COMPLETED_PATIENTS_FAILED,
} from "../../actions/types";
import completedPatientsReducer from "../completedPatientsReducer";

const INITIAL_STATE = {
  completedPatients: {},
  loading: false,
  loaded: false,
  error: null,
};

describe("Completed Patients Reducer", () => {
  it("should return default state", () => {
    const newState = completedPatientsReducer(INITIAL_STATE, {});
    expect(newState).toEqual(INITIAL_STATE);
  });

  it("should update the state on loading", () => {
    const newState = completedPatientsReducer(INITIAL_STATE, {
      type: FETCH_COMPLETED_PATIENTS_LOADING,
    });
    expect(newState).toEqual({
      completedPatients: {},
      loading: true,
      loaded: false,
      error: null,
    });
  });

  it("should update the state on loaded", () => {
    const newState = completedPatientsReducer(INITIAL_STATE, {
      type: FETCH_COMPLETED_PATIENTS,
      payload: {
        14: [
          {
            patient: {
              comments: [
                {
                  id: 14,
                  patId: 14,
                  status: "No Status Found",
                  comment: "No Comment Found",
                  commented_AT: "2021-03-11T11:47:13.000+00:00",
                },
                {
                  id: 54,
                  patId: 14,
                  status:
                    "Reviewed by Provider, No further action required. Patient Contacted",
                  comment: "Completed",
                  commented_AT: "2021-03-13T02:39:50.000+00:00",
                },
                {
                  id: 67,
                  patId: 14,
                  status: "Completed callback in error",
                  comment: "Updated wrong test",
                  commented_AT: "2021-03-18T12:40:54.000+00:00",
                },
                {
                  id: 76,
                  patId: 14,
                  status:
                    "Reviewed by Provider, No further action required. Patient Contacted",
                  comment: "Test on refresh",
                  commented_AT: "2021-03-25T17:48:48.000+00:00",
                },
                {
                  id: 77,
                  patId: 14,
                  status: "Completed callback in error",
                  comment: "Test on refresh",
                  commented_AT: "2021-03-25T17:49:07.000+00:00",
                },
              ],
              pat_INSURANCE_ID: "KK123012",
              pat_HEIGHT: 150,
              pat_AGE: 87,
              pat_BLOODGROUP: "O+ve",
              pat_GENDER: "MALE",
              pat_WEIGHT: 83,
              pat_ADDRESS: "147 Sandy Forest",
              pat_DOB: "1934-11-12",
              pat_FIRSTNAME: "Kenton",
              pat_CONTACT: "+919443876509",
              pat_EMAIL: "jordi.padberg@yahoo.com",
              pat_LASTNAME: "Kling",
              pat_ID: 14,
            },
            t_RESULT: "38",
            t_NAME: "SpO2",
            t_DATE: "2021-02-17",
            t_CATEGORY: "RADIOLOGY",
            t_UNITS: "%",
            t_MOD_AT: "2021-02-17T07:37:04.000+00:00",
            t_STATUS: "No Status Found",
            is_NOTIFIED: 0,
            t_ID: 52,
            doc_ID: 168194,
            t_COMMENT: "No Comment Found",
            normal_RANGE: "--",
            pat_ID: 14,
          },
          {
            patient: {
              comments: [
                {
                  id: 14,
                  patId: 14,
                  status: "No Status Found",
                  comment: "No Comment Found",
                  commented_AT: "2021-03-11T11:47:13.000+00:00",
                },
                {
                  id: 54,
                  patId: 14,
                  status:
                    "Reviewed by Provider, No further action required. Patient Contacted",
                  comment: "Completed",
                  commented_AT: "2021-03-13T02:39:50.000+00:00",
                },
                {
                  id: 67,
                  patId: 14,
                  status: "Completed callback in error",
                  comment: "Updated wrong test",
                  commented_AT: "2021-03-18T12:40:54.000+00:00",
                },
                {
                  id: 76,
                  patId: 14,
                  status:
                    "Reviewed by Provider, No further action required. Patient Contacted",
                  comment: "Test on refresh",
                  commented_AT: "2021-03-25T17:48:48.000+00:00",
                },
                {
                  id: 77,
                  patId: 14,
                  status: "Completed callback in error",
                  comment: "Test on refresh",
                  commented_AT: "2021-03-25T17:49:07.000+00:00",
                },
              ],
              pat_INSURANCE_ID: "KK123012",
              pat_HEIGHT: 150,
              pat_AGE: 87,
              pat_BLOODGROUP: "O+ve",
              pat_GENDER: "MALE",
              pat_WEIGHT: 83,
              pat_ADDRESS: "147 Sandy Forest",
              pat_DOB: "1934-11-12",
              pat_FIRSTNAME: "Kenton",
              pat_CONTACT: "+919443876509",
              pat_EMAIL: "jordi.padberg@yahoo.com",
              pat_LASTNAME: "Kling",
              pat_ID: 14,
            },
            t_RESULT: "85",
            t_NAME: "Diastolic Blood Pressure",
            t_DATE: "2021-02-17",
            t_CATEGORY: "CARDIOLOGY",
            t_UNITS: "mmHg",
            t_MOD_AT: "2021-02-17T07:37:06.000+00:00",
            t_STATUS: "No Status Found",
            is_NOTIFIED: 0,
            t_ID: 53,
            doc_ID: 541321,
            t_COMMENT: "No Comment Found",
            normal_RANGE: "60-90",
            pat_ID: 14,
          },
          {
            patient: {
              comments: [
                {
                  id: 14,
                  patId: 14,
                  status: "No Status Found",
                  comment: "No Comment Found",
                  commented_AT: "2021-03-11T11:47:13.000+00:00",
                },
                {
                  id: 54,
                  patId: 14,
                  status:
                    "Reviewed by Provider, No further action required. Patient Contacted",
                  comment: "Completed",
                  commented_AT: "2021-03-13T02:39:50.000+00:00",
                },
                {
                  id: 67,
                  patId: 14,
                  status: "Completed callback in error",
                  comment: "Updated wrong test",
                  commented_AT: "2021-03-18T12:40:54.000+00:00",
                },
                {
                  id: 76,
                  patId: 14,
                  status:
                    "Reviewed by Provider, No further action required. Patient Contacted",
                  comment: "Test on refresh",
                  commented_AT: "2021-03-25T17:48:48.000+00:00",
                },
                {
                  id: 77,
                  patId: 14,
                  status: "Completed callback in error",
                  comment: "Test on refresh",
                  commented_AT: "2021-03-25T17:49:07.000+00:00",
                },
              ],
              pat_INSURANCE_ID: "KK123012",
              pat_HEIGHT: 150,
              pat_AGE: 87,
              pat_BLOODGROUP: "O+ve",
              pat_GENDER: "MALE",
              pat_WEIGHT: 83,
              pat_ADDRESS: "147 Sandy Forest",
              pat_DOB: "1934-11-12",
              pat_FIRSTNAME: "Kenton",
              pat_CONTACT: "+919443876509",
              pat_EMAIL: "jordi.padberg@yahoo.com",
              pat_LASTNAME: "Kling",
              pat_ID: 14,
            },
            t_RESULT: "160",
            t_NAME: "Systolic Blood Pressure",
            t_DATE: "2021-02-17",
            t_CATEGORY: "CARDIOLOGY",
            t_UNITS: "mmHg",
            t_MOD_AT: "2021-02-17T07:37:09.000+00:00",
            t_STATUS: "No Status Found",
            is_NOTIFIED: 0,
            t_ID: 54,
            doc_ID: 541321,
            t_COMMENT: "No Comment Found",
            normal_RANGE: "90-140",
            pat_ID: 14,
          },
        ],
      },
    });
    expect(newState).toEqual({
      completedPatients: {
        14: [
          {
            patient: {
              comments: [
                {
                  id: 14,
                  patId: 14,
                  status: "No Status Found",
                  comment: "No Comment Found",
                  commented_AT: "2021-03-11T11:47:13.000+00:00",
                },
                {
                  id: 54,
                  patId: 14,
                  status:
                    "Reviewed by Provider, No further action required. Patient Contacted",
                  comment: "Completed",
                  commented_AT: "2021-03-13T02:39:50.000+00:00",
                },
                {
                  id: 67,
                  patId: 14,
                  status: "Completed callback in error",
                  comment: "Updated wrong test",
                  commented_AT: "2021-03-18T12:40:54.000+00:00",
                },
                {
                  id: 76,
                  patId: 14,
                  status:
                    "Reviewed by Provider, No further action required. Patient Contacted",
                  comment: "Test on refresh",
                  commented_AT: "2021-03-25T17:48:48.000+00:00",
                },
                {
                  id: 77,
                  patId: 14,
                  status: "Completed callback in error",
                  comment: "Test on refresh",
                  commented_AT: "2021-03-25T17:49:07.000+00:00",
                },
              ],
              pat_INSURANCE_ID: "KK123012",
              pat_HEIGHT: 150,
              pat_AGE: 87,
              pat_BLOODGROUP: "O+ve",
              pat_GENDER: "MALE",
              pat_WEIGHT: 83,
              pat_ADDRESS: "147 Sandy Forest",
              pat_DOB: "1934-11-12",
              pat_FIRSTNAME: "Kenton",
              pat_CONTACT: "+919443876509",
              pat_EMAIL: "jordi.padberg@yahoo.com",
              pat_LASTNAME: "Kling",
              pat_ID: 14,
            },
            t_RESULT: "38",
            t_NAME: "SpO2",
            t_DATE: "2021-02-17",
            t_CATEGORY: "RADIOLOGY",
            t_UNITS: "%",
            t_MOD_AT: "2021-02-17T07:37:04.000+00:00",
            t_STATUS: "No Status Found",
            is_NOTIFIED: 0,
            t_ID: 52,
            doc_ID: 168194,
            t_COMMENT: "No Comment Found",
            normal_RANGE: "--",
            pat_ID: 14,
          },
          {
            patient: {
              comments: [
                {
                  id: 14,
                  patId: 14,
                  status: "No Status Found",
                  comment: "No Comment Found",
                  commented_AT: "2021-03-11T11:47:13.000+00:00",
                },
                {
                  id: 54,
                  patId: 14,
                  status:
                    "Reviewed by Provider, No further action required. Patient Contacted",
                  comment: "Completed",
                  commented_AT: "2021-03-13T02:39:50.000+00:00",
                },
                {
                  id: 67,
                  patId: 14,
                  status: "Completed callback in error",
                  comment: "Updated wrong test",
                  commented_AT: "2021-03-18T12:40:54.000+00:00",
                },
                {
                  id: 76,
                  patId: 14,
                  status:
                    "Reviewed by Provider, No further action required. Patient Contacted",
                  comment: "Test on refresh",
                  commented_AT: "2021-03-25T17:48:48.000+00:00",
                },
                {
                  id: 77,
                  patId: 14,
                  status: "Completed callback in error",
                  comment: "Test on refresh",
                  commented_AT: "2021-03-25T17:49:07.000+00:00",
                },
              ],
              pat_INSURANCE_ID: "KK123012",
              pat_HEIGHT: 150,
              pat_AGE: 87,
              pat_BLOODGROUP: "O+ve",
              pat_GENDER: "MALE",
              pat_WEIGHT: 83,
              pat_ADDRESS: "147 Sandy Forest",
              pat_DOB: "1934-11-12",
              pat_FIRSTNAME: "Kenton",
              pat_CONTACT: "+919443876509",
              pat_EMAIL: "jordi.padberg@yahoo.com",
              pat_LASTNAME: "Kling",
              pat_ID: 14,
            },
            t_RESULT: "85",
            t_NAME: "Diastolic Blood Pressure",
            t_DATE: "2021-02-17",
            t_CATEGORY: "CARDIOLOGY",
            t_UNITS: "mmHg",
            t_MOD_AT: "2021-02-17T07:37:06.000+00:00",
            t_STATUS: "No Status Found",
            is_NOTIFIED: 0,
            t_ID: 53,
            doc_ID: 541321,
            t_COMMENT: "No Comment Found",
            normal_RANGE: "60-90",
            pat_ID: 14,
          },
          {
            patient: {
              comments: [
                {
                  id: 14,
                  patId: 14,
                  status: "No Status Found",
                  comment: "No Comment Found",
                  commented_AT: "2021-03-11T11:47:13.000+00:00",
                },
                {
                  id: 54,
                  patId: 14,
                  status:
                    "Reviewed by Provider, No further action required. Patient Contacted",
                  comment: "Completed",
                  commented_AT: "2021-03-13T02:39:50.000+00:00",
                },
                {
                  id: 67,
                  patId: 14,
                  status: "Completed callback in error",
                  comment: "Updated wrong test",
                  commented_AT: "2021-03-18T12:40:54.000+00:00",
                },
                {
                  id: 76,
                  patId: 14,
                  status:
                    "Reviewed by Provider, No further action required. Patient Contacted",
                  comment: "Test on refresh",
                  commented_AT: "2021-03-25T17:48:48.000+00:00",
                },
                {
                  id: 77,
                  patId: 14,
                  status: "Completed callback in error",
                  comment: "Test on refresh",
                  commented_AT: "2021-03-25T17:49:07.000+00:00",
                },
              ],
              pat_INSURANCE_ID: "KK123012",
              pat_HEIGHT: 150,
              pat_AGE: 87,
              pat_BLOODGROUP: "O+ve",
              pat_GENDER: "MALE",
              pat_WEIGHT: 83,
              pat_ADDRESS: "147 Sandy Forest",
              pat_DOB: "1934-11-12",
              pat_FIRSTNAME: "Kenton",
              pat_CONTACT: "+919443876509",
              pat_EMAIL: "jordi.padberg@yahoo.com",
              pat_LASTNAME: "Kling",
              pat_ID: 14,
            },
            t_RESULT: "160",
            t_NAME: "Systolic Blood Pressure",
            t_DATE: "2021-02-17",
            t_CATEGORY: "CARDIOLOGY",
            t_UNITS: "mmHg",
            t_MOD_AT: "2021-02-17T07:37:09.000+00:00",
            t_STATUS: "No Status Found",
            is_NOTIFIED: 0,
            t_ID: 54,
            doc_ID: 541321,
            t_COMMENT: "No Comment Found",
            normal_RANGE: "90-140",
            pat_ID: 14,
          },
        ],
      },
      loading: false,
      loaded: true,
      error: null,
    });
  });

  it("should update the state on failed", () => {
    const newState = completedPatientsReducer(INITIAL_STATE, {
      type: FETCH_COMPLETED_PATIENTS_FAILED,
      payload: "Error in loading completed patients, please try again",
    });
    expect(newState).toEqual({
      completedPatients: {},
      loading: false,
      loaded: true,
      error: "Error in loading completed patients, please try again",
    });
  });
});
