import React from "react";
import { Link } from "react-router-dom";
import CallbackForm from "./patients/CallbackForm";
import CompletedForm from "./patients/CompletedForm";
import {
  updateSummary,
  revertSummary,
  fetchCallbackPatients,
  fetchCompletedPatients,
  deleteComment,
} from "../actions";
import { connect } from "react-redux";

/**
 * PatientModal class component that shows details of patient
 * with CallbackForm/CompleteForm component
 */
class PatientModal extends React.Component {
  /**
   * Method to decide which form to show
   *
   * @param {int} notified - Notification status
   * @param {object} patientDetail - Details of the patient
   * @returns CallbackForm/CompletedForm based on notification status
   */
  form = (notified, patientDetail) => {
    if (notified === 0) {
      return (
        <CallbackForm onSubmit={this.onSubmit} patientDetail={patientDetail} />
      );
    } else {
      return (
        <CompletedForm onSubmit={this.onSubmit} patientDetail={patientDetail} />
      );
    }
  };

  /**
   * Handles form submission
   *
   * @param {object} formValues - Contains the form values.
   */
  onSubmit = (formValues) => {
    const { patientDetail } = this.props;
    if (this.props.notified === 0) {
      if (!formValues.action) {
        this.props.updateSummary(
          patientDetail.pat_ID,
          formValues.status,
          formValues.comment,
          0
        );
      } else {
        var status = "Reviewed by Provider, No further action required. ";
        status += formValues.status;
        this.props.updateSummary(
          patientDetail.pat_ID,
          status,
          formValues.comment,
          1
        );
      }
    } else {
      this.props.revertSummary(
        patientDetail.pat_ID,
        formValues.status,
        formValues.comment
      );
    }
  };

  /**
   * Method to fetch callback patients and completed
   * patients using action creators.
   */
  updatePatientLists = () => {
    const { locations } = this.props;
    const loc_ID = [];
    var locationIds = "";
    for (const location in locations) {
      const item = locations[location];
      loc_ID.push(item.loc_ID);
    }
    var i;
    for (i = 0; i < loc_ID.length; i++) {
      locationIds += loc_ID[i];
      if (i !== loc_ID.length - 1) {
        locationIds += ",";
      }
    }
    this.props.fetchCallbackPatients(locationIds);
    this.props.fetchCompletedPatients(locationIds);
  };

  /**
   * componentDidUpdate() is a component lifecycle method which is
   * called if the component gets updated.
   */
  componentDidUpdate() {
    this.updatePatientLists();
  }

  /**
   * Method to delete a comment using action creator
   *
   * @param {object} commentDetails - Details of the comment
   */
  deleteComment = (commentDetails) => {
    this.props.deleteComment(commentDetails.id, commentDetails.patId);
  };

  /**
   * Method to render the list of comment details
   *
   * @param {object} commentDetails - Details of the comment
   * @returns Comment details in a list of <div></div> tags
   */
  renderCommentLists(commentDetails) {
    var { id, status, comment, commented_AT } = commentDetails;
    const modDate = new Date(commented_AT).toUTCString();
    return (
      <div
        key={id}
        className="columns is-vcentered"
        style={{ borderBottom: "1px solid #FFE4E6" }}
      >
        <div className="column has-text-centered">
          <p>{modDate}</p>
        </div>
        <div className="column has-text-centered">
          <p>
            <strong>{status}</strong>
          </p>
        </div>
        <div className="column has-text-centered">
          <p>{comment}</p>
        </div>
        <div className="column is-1">
          <button
            className="delete is-small"
            onClick={() => {
              this.deleteComment(commentDetails);
            }}
          ></button>
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
    const { patientDetail } = this.props;
    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card" style={{ width: "75%" }}>
          <header
            className="modal-card-head"
            style={{ backgroundColor: "#f97171" }}
          >
            <p className="modal-card-title">Patient Details</p>
            <Link to="/" className="delete" aria-label="close" />
          </header>
          <section
            className="modal-card-body"
            style={{ backgroundColor: "#FFF5EF", padding: "0" }}
          >
            <div style={{ backgroundColor: "#dddddd", padding: "15px" }}>
              <h4 className="title is-4 has-text-centered">
                {patientDetail.pat_NAME}
              </h4>
              <div className="columns is-vcentered">
                <div className="column has-text-centered">
                  <p>
                    Gender: <strong>{patientDetail.pat_GENDER}</strong>
                  </p>
                </div>
                <div className="column has-text-centered">
                  <p>
                    Date of Birth: <strong>{patientDetail.pat_DOB}</strong>
                  </p>
                </div>
                <div className="column has-text-centered">
                  <p>
                    Age: <strong>{patientDetail.pat_AGE}</strong>
                  </p>
                </div>
                <div className="column has-text-centered">
                  <p>
                    Height: <strong>{patientDetail.pat_HEIGHT} cms</strong>
                  </p>
                </div>
                <div className="column has-text-centered">
                  <p>
                    Weight: <strong>{patientDetail.pat_WEIGHT} kgs</strong>
                  </p>
                </div>
              </div>
              {this.props.location}
            </div>
            <div style={{ padding: "15px" }}>{this.props.tests}</div>
            <div style={{ padding: "15px" }}>
              <div className="columns is-centered">
                <div className="column is-9">
                  {this.form(this.props.notified, patientDetail)}
                </div>
              </div>
            </div>
            <br />
            <div style={{ padding: "15px" }}>
              <div className="columns is-centered">
                <div className="column is-9">
                  <h6 className="subtitle">
                    <strong>Comment History</strong>
                  </h6>
                  {this.props.commentDetails
                    .slice(0)
                    .reverse()
                    .map((comment) => {
                      return this.renderCommentLists(comment);
                    })}
                </div>
              </div>
            </div>
          </section>
          <footer
            className="modal-card-foot buttons is-centered"
            style={{ backgroundColor: "#DECFCF" }}
          >
            {this.props.footer}
          </footer>
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
    commentDetails: state.comments.comments,
    locations: state.locations.locations,
  };
};

/**
 * Exporting PatientModal as default export while
 * connecting state, and dispatch to props of the component
 */
export default connect(mapStateToProps, {
  updateSummary,
  revertSummary,
  fetchCallbackPatients,
  fetchCompletedPatients,
  deleteComment,
})(PatientModal);
