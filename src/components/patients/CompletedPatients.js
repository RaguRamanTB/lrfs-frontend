import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Table from "./Table";

/**
 * CompletedPatients class component that renders the
 * table of completed patients.
 */
class CompletedPatients extends React.Component {
  /**
   * Method to render the table of completed patients.
   *
   * @returns Table component with props of completed patient list
   */
  renderTable() {
    const { completedPatients } = this.props;
    for (const completedPatient in completedPatients) {
      const item = completedPatients[completedPatient];
      item.forEach((test) => {
        const pat_NAME =
          test.patient.pat_LASTNAME + ", " + test.patient.pat_FIRSTNAME;
        test.pat_NAME = pat_NAME;
      });
    }
    return <Table patients={completedPatients} />;
  }

  /**
   * render() is the main component lifecycle method
   * and is responsible for describing the view to
   * be rendered to the browser.
   */
  render() {
    const { completedPatients } = this.props;
    if (!_.isEmpty(completedPatients)) {
      return this.renderTable();
    }
    return <div>Select a criteria list and location unit.</div>;
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
    completedPatients: state.completedPatients.completedPatients,
  };
};

/**
 * Exporting CompletedPatients as default export while
 * connecting state to props of the component
 */
export default connect(mapStateToProps, null)(CompletedPatients);
