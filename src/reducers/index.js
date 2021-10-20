import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import patientReducer from "./patientReducer";
import criteriaListsReducer from "./criteriaListsReducer";
import locationsReducers from "./locationsReducer";
import callbackPatientsReducer from "./callBackPatientsReducer";
import completedPatientsReducer from "./completedPatientsReducer";
import patientTestsReducer from "./patientTestsReducer";
import patientSummaryReducer from "./patientSummaryReducer";
import locationFromBedReducer from "./locationFromBedReducer";
import commentsReducer from "./commentsReducer";
import currentLocationsReducer from "./currentLocationsReducer";

export default combineReducers({
  patients: patientReducer,
  criteriaLists: criteriaListsReducer,
  locations: locationsReducers,
  callbackPatients: callbackPatientsReducer,
  completedPatients: completedPatientsReducer,
  patientTests: patientTestsReducer,
  patientSummary: patientSummaryReducer,
  locationDetails: locationFromBedReducer,
  comments: commentsReducer,
  currentLocationIDs: currentLocationsReducer,
  form: formReducer,
});
