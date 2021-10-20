import patients from "../apis/patients";
import { reset } from "redux-form";
import {
  CREATE_PATIENT,
  CREATE_PATIENT_LOADING,
  CREATE_PATIENT_FAILED,
  RESET_CREATE_PATIENT_MESSAGE,
  FETCH_CRITERIA_LIST,
  FETCH_CRITERIA_LIST_LOADING,
  FETCH_CRITERIA_LIST_FAILED,
  FETCH_LOCATIONS,
  FETCH_LOCATIONS_FAILED,
  UPDATE_LOCATION_IDS,
  FETCH_CALLBACK_PATIENTS,
  FETCH_CALLBACK_PATIENTS_FAILED,
  FETCH_CALLBACK_PATIENTS_LOADING,
  FETCH_COMPLETED_PATIENTS,
  FETCH_COMPLETED_PATIENTS_FAILED,
  FETCH_COMPLETED_PATIENTS_LOADING,
  FETCH_TESTS_PATIENTS,
  FETCH_TESTS_PATIENTS_FAILED,
  FETCH_TESTS_PATIENTS_LOADING,
  FETCH_PATIENT_SUMMARY,
  FETCH_PATIENT_SUMMARY_FAILED,
  FETCH_PATIENT_SUMMARY_LOADING,
  FETCH_LOCATION_FROM_BED,
  FETCH_LOCATION_FROM_BED_FAILED,
  FETCH_LOCATION_FROM_BED_LOADING,
  FETCH_COMMENTS,
  FETCH_COMMENTS_FAILED,
  FETCH_COMMENTS_LOADING,
  UPDATE_SUMMARY,
  UPDATE_SUMMARY_FAILED,
  UPDATE_SUMMARY_LOADING,
  REVERT_SUMMARY,
  REVERT_SUMMARY_FAILED,
  REVERT_SUMMARY_LOADING,
  DELETE_COMMENTS,
  DELETE_COMMENTS_FAILED,
  DELETE_COMMENTS_LOADING,
} from "./types";

/**
 * Axios request to POST (create) a patient
 *
 * @param {object} formValues - Values of patient to register
 * @returns Dispatch to the reducer
 */
export const createPatient = (formValues) => async (dispatch) => {
  dispatch({ type: CREATE_PATIENT_LOADING });
  patients
    .post("/patients", formValues)
    .then((response) => {
      dispatch({
        type: CREATE_PATIENT,
        payload: response.data,
      });
      dispatch(reset("patientCreateForm"));
    })
    .catch((error) => {
      if (error.response.data.details) {
        dispatch({
          type: CREATE_PATIENT_FAILED,
          payload: error.response.data.details,
        });
      } else {
        dispatch({
          type: CREATE_PATIENT_FAILED,
          payload: error.response.data,
        });
      }
    });
};

/**
 * Method to change patient registration status
 *
 * @returns Dispatch to the reducer
 */
export const resetCreatePatientMessage = () => async (dispatch) => {
  dispatch({ type: RESET_CREATE_PATIENT_MESSAGE });
};

/**
 * Axios request to GET (fetch) criteria lists
 *
 * @returns Dispatch to the reducer
 */
export const fetchCriteriaLists = () => async (dispatch) => {
  dispatch({ type: FETCH_CRITERIA_LIST_LOADING });
  patients
    .get("/criterialists")
    .then((response) => {
      dispatch({
        type: FETCH_CRITERIA_LIST,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_CRITERIA_LIST_FAILED,
        payload: "Error in loading criteria lists, please try again.",
      });
    });
};

/**
 * Axios request to GET (fetch) location units with building IDs
 *
 * @param {Array} ids - List of building IDs
 * @returns Dispatch to the reducer
 */
export const fetchLocations = (ids) => async (dispatch) => {
  patients
    .get("/locationunits/ids", {
      params: {
        ids: ids,
      },
    })
    .then((response) => {
      dispatch({
        type: FETCH_LOCATIONS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_LOCATIONS_FAILED,
        payload: "Error in loading locations, please try again.",
      });
    });
};

/**
 * Action creator to update the current selected location IDs
 *
 * @param {Array} locationIds - List of location IDs
 * @returns Dispatch to the reducer
 */
export const updateCurrentLocationIDs = (locationIds) => async (dispatch) => {
  dispatch({
    type: UPDATE_LOCATION_IDS,
    payload: locationIds,
  });
};

/**
 * Axios request to GET (fetch) callback patients based on location units
 *
 * @param {Array} locationIds - List of location unit IDs
 * @returns Dispatch to the reducer
 */
export const fetchCallbackPatients = (locationIds) => async (dispatch) => {
  dispatch({ type: FETCH_CALLBACK_PATIENTS_LOADING });
  patients
    .get("/patientsummary/status", {
      params: {
        locationIds: locationIds,
        notified: 0,
        discharged: 1,
      },
    })
    .then((response) => {
      dispatch({
        type: FETCH_CALLBACK_PATIENTS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_CALLBACK_PATIENTS_FAILED,
        payload: "Error in loading callback patients, please try again.",
      });
    });
};

/**
 * Axios request to GET (fetch) completed patients based on location units
 *
 * @param {Array} locationIds - List of location unit IDs
 * @returns Dispatch to the reducer
 */
export const fetchCompletedPatients = (locationIds) => async (dispatch) => {
  dispatch({ type: FETCH_COMPLETED_PATIENTS_LOADING });
  patients
    .get("/patientsummary/status", {
      params: {
        locationIds: locationIds,
        notified: 1,
        discharged: 1,
      },
    })
    .then((response) => {
      dispatch({
        type: FETCH_COMPLETED_PATIENTS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_COMPLETED_PATIENTS_FAILED,
        payload: "Error in loading completed patients, please try again.",
      });
    });
};

/**
 * Axios request to GET (fetch) tests of a patient by patient ID
 *
 * @param {long} patID - Patient ID
 * @returns Dispatch to the reducer
 */
export const fetchTestsForPatient = (patId) => async (dispatch) => {
  dispatch({ type: FETCH_TESTS_PATIENTS_LOADING });
  patients
    .get(`/patientsummary/tests/${patId}`)
    .then((response) => {
      dispatch({
        type: FETCH_TESTS_PATIENTS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_TESTS_PATIENTS_FAILED,
        payload:
          "Error in loading patient's lab test details, please try again.",
      });
    });
};

/**
 * Axios request to GET (fetch) patient summaries of a patient by patient ID
 *
 * @param {long} patID - Patient ID
 * @returns Dispatch to the reducer
 */
export const fetchPatientSummary = (patId) => async (dispatch) => {
  dispatch({ type: FETCH_PATIENT_SUMMARY_LOADING });
  patients
    .get(`/patientsummary/${patId}`)
    .then((response) => {
      dispatch({
        type: FETCH_PATIENT_SUMMARY,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_PATIENT_SUMMARY_FAILED,
        payload: "Error in loading patient's summary, please try again.",
      });
    });
};

/**
 * Axios request to GET (fetch) location unit details of a patient by patient ID
 *
 * @param {long} patID - Patient ID
 * @returns Dispatch to the reducer
 */
export const fetchLocationFromBed = (patId) => async (dispatch) => {
  dispatch({ type: FETCH_LOCATION_FROM_BED_LOADING });
  patients
    .get(`/locationunits/bed/${patId}`)
    .then((response) => {
      dispatch({
        type: FETCH_LOCATION_FROM_BED,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_LOCATION_FROM_BED_FAILED,
        error: "Error in loading location unit details, please try again.",
      });
    });
};

/**
 * Method to reset Callback Form
 *
 * @returns Dispatch to the reducer
 */
export const resetCallbackForm = () => async (dispatch) => {
  dispatch(reset("callbackForm"));
};

/**
 * Method to reset Completed Form
 *
 * @returns Dispatch to the reducer
 */
export const resetCompletedForm = () => async (dispatch) => {
  dispatch(reset("completedForm"));
};

/**
 * Axios request to GET (fetch) comments of a patient by patient ID
 *
 * @param {long} patID - Patient ID
 * @returns Dispatch to the reducer
 */
export const fetchComments = (patId) => async (dispatch) => {
  dispatch({ type: FETCH_COMMENTS_LOADING });
  patients
    .get(`/comments/${patId}`)
    .then((response) => {
      dispatch({
        type: FETCH_COMMENTS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_COMMENTS_FAILED,
        payload: "Error in loading comments, please try again.",
      });
    });
};

/**
 * Axios request to PUT (update) test details, and add comments
 * of a patient by patient ID, status, comment and complete status
 *
 * @param {long} patID - Patient ID
 * @param {string} status - Status to be added
 * @param {string} comment - Comment to be added
 * @param {long} complete - Complete indication of tests
 * @returns Dispatch to the reducer
 */
export const updateSummary = (patId, status, comment, complete) => async (
  dispatch
) => {
  dispatch({ type: UPDATE_SUMMARY_LOADING });
  patients
    .put(`/patientsummary/update/${patId}`, null, {
      params: {
        status: status,
        comment: comment,
        complete: complete,
      },
    })
    .then((response) => {
      dispatch(reset("callbackForm"));
      dispatch({
        type: UPDATE_SUMMARY,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_SUMMARY_FAILED,
        payload: "Error in updating summary, please try again.",
      });
    });
};

/**
 * Axios request to PUT (revert) test details to not notified, and add comments
 * of a patient by patient ID, status, and comment
 *
 * @param {long} patID - Patient ID
 * @param {string} status - Status to be added
 * @param {string} comment - Comment to be added
 * @returns Dispatch to the reducer
 */
export const revertSummary = (patId, status, comment) => async (dispatch) => {
  dispatch({ type: REVERT_SUMMARY_LOADING });
  patients
    .put(`/patientsummary/revert/${patId}`, null, {
      params: {
        status: status,
        comment: comment,
      },
    })
    .then((response) => {
      dispatch(reset("completedForm"));
      dispatch({
        type: REVERT_SUMMARY,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: REVERT_SUMMARY_FAILED,
        payload: "Error in updating summary, please try again.",
      });
    });
};

/**
 * Axios request to DELETE (delete) a comment of a patient by
 * patient ID and comment ID.
 *
 * @param {long} commentId - Comment ID to be deleted
 * @param {long} patID - Patient ID
 * @returns Dispatch to the reducer
 */
export const deleteComment = (commentId, patId) => async (dispatch) => {
  dispatch({ type: DELETE_COMMENTS_LOADING });
  patients
    .delete(`/comments/${commentId}`, {
      params: {
        patId: patId,
      },
    })
    .then((response) => {
      dispatch({
        type: DELETE_COMMENTS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: DELETE_COMMENTS_FAILED,
        payload: "Error in deleting comment, please try again.",
      });
    });
};
