/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import $ from "jquery";
import CallbackPatients from "./CallbackPatients";
import CompletedPatients from "./CompletedPatients";

class PatientFetchSelect extends React.Component {
  /**
   * Constructor with component level state and hideComponent function
   */
  constructor() {
    super();
    this.state = {
      showHideCallbackPatients: true,
      showHideCompletedPatients: false,
    };
    this.hideComponent = this.hideComponent.bind(this);
  }

  /**
   * Method to hide a component
   *
   * @param {string} name - Identifier to hide a component
   */
  hideComponent(name) {
    switch (name) {
      case "showHideCallbackPatients":
        this.setState({
          showHideCallbackPatients: !this.state.showHideCallbackPatients,
        });
        break;

      case "showHideCompletedPatients":
        this.setState({
          showHideCompletedPatients: !this.state.showHideCompletedPatients,
        });
        break;

      default:
        break;
    }
  }

  /**
   * Method to change to Completed patients list
   */
  changeToUpdatedList = () => {
    $("#followUpList").removeClass("is-active");
    $("#completedList").addClass("is-active");
    if (this.state.showHideCompletedPatients === false) {
      this.hideComponent("showHideCallbackPatients");
      this.hideComponent("showHideCompletedPatients");
    }
  };

  /**
   * Method to change to Follow-Up patients list
   */
  changeToFollowUpList = () => {
    $("#completedList").removeClass("is-active");
    $("#followUpList").addClass("is-active");
    if (this.state.showHideCallbackPatients === false) {
      this.hideComponent("showHideCallbackPatients");
      this.hideComponent("showHideCompletedPatients");
    }
  };

  /**
   * render() is the main component lifecycle method
   * and is responsible for describing the view to
   * be rendered to the browser.
   */
  render() {
    const { showHideCallbackPatients, showHideCompletedPatients } = this.state;
    return (
      <div style={{ padding: "15px 20px" }}>
        <div className="tabs is-boxed">
          <ul>
            <li id="followUpList" className="is-active">
              <a id="followUpListButton" onClick={this.changeToFollowUpList}>
                <label className="label">Follow-Up List</label>
              </a>
            </li>
            <li id="completedList">
              <a id="completedListButton" onClick={this.changeToUpdatedList}>
                <label className="label">Completed Patients List</label>
              </a>
            </li>
          </ul>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {showHideCallbackPatients && <CallbackPatients />}
          {showHideCompletedPatients && <CompletedPatients />}
        </div>
      </div>
    );
  }
}

/**
 * Exporting PatientFetchSelect as the default export
 */
export default PatientFetchSelect;
