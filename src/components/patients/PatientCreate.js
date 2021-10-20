import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createPatient, resetCreatePatientMessage } from "../../actions";
import PatientCreateForm from "./PatientCreateForm";
import Message from "../Message";

/**
 * PatientCreate class component that renders the
 * component of patient registration with PatientCreateForm
 * component and Message component.
 */
class PatientCreate extends React.Component {
  /**
   * Handle PatientCreateForm form submission
   *
   * @param {object} formValues - Form values of the PatientCreateForm
   */
  onSubmit = (formValues) => {
    var age = formValues.pat_AGE;
    if (age.includes("year")) {
      age = age.substring(0, age.indexOf(" "));
    } else {
      age = "0";
    }
    const newValues = Object.assign({}, formValues, {
      pat_GENDER: formValues.pat_GENDER.value,
      pat_BLOODGROUP: formValues.pat_BLOODGROUP.value,
      pat_CONTACT: "+91" + formValues.pat_CONTACT,
      pat_AGE: age,
    });
    this.props.createPatient(newValues);
  };

  /**
   * render() is the main component lifecycle method
   * and is responsible for describing the view to
   * be rendered to the browser.
   */
  render() {
    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header
            className="modal-card-head"
            style={{ backgroundColor: "#f97171" }}
          >
            <p className="modal-card-title">Create a patient</p>
            <Link to="/">
              <button
                className="delete"
                aria-label="close"
                onClick={() => {
                  this.props.resetCreatePatientMessage();
                }}
              ></button>
            </Link>
          </header>
          <section className="modal-card-body">
            <PatientCreateForm onSubmit={this.onSubmit} />
          </section>
          <Message
            loaded={this.props.loaded}
            loading={this.props.loading}
            error={this.props.error}
          />
        </div>
      </div>
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
    loaded: state.patients.loaded,
    loading: state.patients.loading,
    error: state.patients.error,
  };
};

/**
 * Exporting PatientCreate as default export while
 * connecting state, and dispatches to props of the component
 */
export default connect(mapStateToProps, {
  createPatient,
  resetCreatePatientMessage,
})(PatientCreate);
