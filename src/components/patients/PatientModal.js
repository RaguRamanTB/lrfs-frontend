import React from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import { Link } from "react-router-dom";
import {
  fetchTestsForPatient,
  fetchPatientSummary,
  fetchLocationFromBed,
  fetchComments,
} from "../../actions";
import _ from "lodash";

class PatientModal extends React.Component {
  /**
   * componentDidMount() is a component lifecycle method
   * and is invoked immediately after the component
   * is mounted (inserted into the tree).
   */
  componentDidMount() {
    this.props.fetchTestsForPatient(this.props.match.params.id);
    this.props.fetchPatientSummary(this.props.match.params.id);
    this.props.fetchLocationFromBed(this.props.match.params.id);
    this.props.fetchComments(this.props.match.params.id);
  }

  /**
   * Method that renders footer of the card view
   *
   * @returns Footer component with a Close Button for the card
   */
  renderCardFooter() {
    return (
      <div>
        <Link to="/" className="button">
          Close
        </Link>
      </div>
    );
  }

  /**
   * Renders the list item of the tests
   *
   * @param {object} test
   * @returns Row of test details component
   */
  renderTestList(test) {
    var {
      t_ID,
      t_NAME,
      normal_RANGE,
      t_RESULT,
      t_UNITS,
      t_MOD_AT,
      is_NOTIFIED,
    } = test;
    const range = normal_RANGE.split("-");
    const min = range[0];
    const max = range[1];
    const degree = "\u00B0";
    var className = "tag is-medium ";
    var notified = "Not yet notified";
    var notifiedClassName = "tag is-rounded ";
    if (normal_RANGE === "--") {
      className += "is-info";
    } else if (t_RESULT < min || t_RESULT > max) {
      className += "is-danger";
    } else {
      className += "is-success";
    }
    if (is_NOTIFIED === 1) {
      notified = "Notified";
      notifiedClassName += "is-success";
    } else if (normal_RANGE === "--" && is_NOTIFIED === 0) {
      notifiedClassName += "is-warning";
    } else if ((t_RESULT < min || t_RESULT > max) && is_NOTIFIED === 0) {
      notifiedClassName += "is-danger";
    } else {
      notifiedClassName += "is-warning";
    }
    if (t_UNITS === "degC") {
      t_UNITS = degree + "C";
    }
    t_RESULT = t_RESULT + " " + t_UNITS;
    normal_RANGE = normal_RANGE + " " + t_UNITS;
    const modDate = new Date(t_MOD_AT).toUTCString();
    return (
      <div
        key={t_ID}
        className="columns is-vcentered"
        style={{ borderBottom: "1px solid #FFE4E6" }}
      >
        <div className="column">
          <p>{t_NAME}</p>
          <p>{normal_RANGE}</p>
        </div>
        <div className="column">
          <span className={className}>{t_RESULT}</span>
        </div>
        <div className="column">
          <p>{modDate}</p>
        </div>
        <div className="column has-text-centered">
          <span className={notifiedClassName}>{notified}</span>
        </div>
      </div>
    );
  }

  /**
   * Renders the details of the patient in the top
   * of the card
   *
   * @returns Card info bar with patient details
   */
  renderHospInfo() {
    const { patientSummary } = this.props.summary;
    const { locationDetails } = this.props.locationDetails;
    return (
      <div className="columns is-vcentered">
        <div className="column has-text-centered">
          <p>
            Encounter Date: <strong>{patientSummary[0].admit_DATE}</strong>
          </p>
        </div>
        <div className="column has-text-centered">
          <p>
            Location: <strong>{locationDetails.locationUnit.loc_NAME}</strong>
          </p>
        </div>
        <div className="column has-text-centered">
          <p>
            Room:{" "}
            <strong>
              {locationDetails.room.r_CODE} - {locationDetails.room.r_TYPE} -{" "}
              {locationDetails.bed.b_CODE}
            </strong>
          </p>
        </div>
        <div className="column has-text-centered">
          <p>
            Discharge Date: <strong>{patientSummary[0].dis_DATE}</strong>
          </p>
        </div>
      </div>
    );
  }

  /**
   * Method to calculate age from DOB.
   *
   * @param {string} dateString - DOB in string in the format yyyy-mm-dd
   * @returns Age split in years/months/days
   */
  getAgeFromDOB = (dateString) => {
    var now = new Date();
    var yearNow = now.getYear();
    var monthNow = now.getMonth();
    var dateNow = now.getDate();
    var dob = new Date(
      dateString.substring(0, 4),
      dateString.substring(5, 7) - 1,
      dateString.substring(8, 10)
    );
    var yearDob = dob.getYear();
    var monthDob = dob.getMonth();
    var dateDob = dob.getDate();
    var age = {};
    var ageString = "";
    var yearString = "";
    var monthString = "";
    var dayString = "";
    var yearAge = yearNow - yearDob;
    var monthAge;
    var dateAge;
    if (monthNow >= monthDob) monthAge = monthNow - monthDob;
    else {
      yearAge--;
      monthAge = 12 + monthNow - monthDob;
    }

    if (dateNow >= dateDob) dateAge = dateNow - dateDob;
    else {
      monthAge--;
      dateAge = 31 + dateNow - dateDob;

      if (monthAge < 0) {
        monthAge = 11;
        yearAge--;
      }
    }
    age = {
      years: yearAge,
      months: monthAge,
      days: dateAge,
    };
    if (age.years > 1) yearString = " years ";
    else yearString = " year ";
    if (age.months > 1) monthString = " months ";
    else monthString = " month ";
    if (age.days > 1) dayString = " days";
    else dayString = " day";

    if (age.years > 0) {
      ageString =
        age.years +
        yearString +
        age.months +
        monthString +
        age.days +
        dayString;
    } else if (age.years === 0 && age.months > 0) {
      ageString = age.months + monthString + age.days + dayString;
    } else if (age.years === 0 && age.months === 0 && age.days > 0) {
      ageString = age.days + dayString;
    } else if (age.years === 0 && age.months === 0 && age.days === 0) {
      ageString = age.days + dayString;
    }

    return ageString;
  };

  /**
   * Renders the list of lab tests taken by
   * the patient
   *
   * @returns List of test components
   */
  renderTests() {
    const { patientTests } = this.props.tests;
    return (
      <div className="columns" style={{ padding: "0px 10px" }}>
        <div className="column">
          {patientTests.map((test) => {
            return this.renderTestList(test);
          })}
        </div>
      </div>
    );
  }

  /**
   * render() is the main component lifecycle method
   * and is responsible for describing the view to
   * be rendered to the browser.
   */
  render() {
    if (
      !_.isEmpty(this.props.tests.patientTests) &&
      !_.isEmpty(this.props.summary.patientSummary) &&
      !_.isEmpty(this.props.locationDetails.locationDetails) &&
      !_.isEmpty(this.props.comments.comments)
    ) {
      const { patientTests } = this.props.tests;
      const patientDetails = patientTests[0].patient;
      const patName =
        patientDetails.pat_LASTNAME + ", " + patientDetails.pat_FIRSTNAME;
      var patAge = patientDetails.pat_AGE;
      const patDOB = patientDetails.pat_DOB;
      if (patAge === 0) {
        patAge = this.getAgeFromDOB(patDOB);
      } else {
        patAge = patAge + " years";
      }
      const patientDetail = Object.assign({}, patientDetails, {
        pat_NAME: patName,
        pat_AGE: patAge,
      });
      return (
        <Modal
          patientDetail={patientDetail}
          tests={this.renderTests()}
          location={this.renderHospInfo()}
          footer={this.renderCardFooter()}
          notified={patientTests[0].is_NOTIFIED}
        />
      );
    }
    return null;
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
    tests: state.patientTests,
    summary: state.patientSummary,
    locationDetails: state.locationDetails,
    comments: state.comments,
  };
};

export default connect(mapStateToProps, {
  fetchTestsForPatient,
  fetchPatientSummary,
  fetchLocationFromBed,
  fetchComments,
})(PatientModal);
