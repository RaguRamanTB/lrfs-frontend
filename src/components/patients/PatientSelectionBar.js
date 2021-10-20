import React from "react";
import { connect } from "react-redux";
import {
  fetchCriteriaLists,
  fetchCallbackPatients,
  fetchCompletedPatients,
  updateCurrentLocationIDs,
} from "../../actions";
import PatientLocationForm from "./PatientLocationForm";

/**
 * PatientCreate class component that renders the
 * component of location selection with PatientLocationForm
 */
class PatientSelectionBar extends React.Component {
  /**
   * Handles PatientLocationForm form submission
   *
   * @param {object} formValues - Form values of the PatientLocationForm
   */
  onSubmit = (formValues) => {
    const loc_ID = [];
    var locationIds = "";
    formValues.loc_ID.forEach((loc) => {
      loc_ID.push(loc.value);
    });
    var i;
    for (i = 0; i < loc_ID.length; i++) {
      locationIds += loc_ID[i];
      if (i !== loc_ID.length - 1) {
        locationIds += ",";
      }
    }
    this.props.updateCurrentLocationIDs(locationIds);
    this.props.fetchCallbackPatients(locationIds);
    this.props.fetchCompletedPatients(locationIds);
  };

  /**
   * componentDidMount() is a component lifecycle method
   * and is invoked immediately after the component
   * is mounted (inserted into the tree).
   */
  componentDidMount() {
    this.props.fetchCriteriaLists();
  }

  /**
   * render() is the main component lifecycle method
   * and is responsible for describing the view to
   * be rendered to the browser.
   */
  render() {
    return (
      <PatientLocationForm
        onSubmit={this.onSubmit}
        criteriaLists={this.props.criteriaLists}
      />
    );
  }
}

/**
 * Method to map application level state values to
 * props of the component.
 *
 * @param {object} state - Component level state from redux store
 * @returns State values mapped to props
 */
const mapStateToProps = (state) => {
  return {
    criteriaLists: state.criteriaLists,
    callbackPatients: state.callbackPatients,
  };
};

/**
 * Exporting PatientSelectionBar as default export while
 * connecting state, and dispatches to props of the component
 */
export default connect(mapStateToProps, {
  fetchCriteriaLists,
  fetchCallbackPatients,
  fetchCompletedPatients,
  updateCurrentLocationIDs,
})(PatientSelectionBar);
