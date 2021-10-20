import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Table from "./Table";

/**
 * CallbackPatients class component that renders the
 * table of callback patients.
 */
class CallbackPatients extends React.Component {
  /**
   * Method to render the table of callback patients.
   *
   * @returns Table component with props of callback patient list
   */
  renderTable() {
    const { callbackPatients } = this.props;
    for (const callbackPatient in callbackPatients) {
      const item = callbackPatients[callbackPatient];
      item.forEach((test) => {
        const pat_NAME =
          test.patient.pat_LASTNAME + ", " + test.patient.pat_FIRSTNAME;
        test.pat_NAME = pat_NAME;
      });
    }
    return <Table patients={callbackPatients} />;
  }

  /**
   * render() is the main component lifecycle method
   * and is responsible for describing the view to
   * be rendered to the browser.
   */
  render() {
    const { callbackPatients } = this.props;
    if (!_.isEmpty(callbackPatients)) {
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
    callbackPatients: state.callbackPatients.callbackPatients,
  };
};

/**
 * Exporting CallbackPatients as default export while
 * connecting state to props of the component
 */
export default connect(mapStateToProps, null)(CallbackPatients);
