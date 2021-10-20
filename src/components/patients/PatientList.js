import React from "react";
import PatientSelectionBar from "./PatientSelectionBar";
import PatientFetchSelect from "./PatientFetchSelect";

/**
 * PatientList class component that is responsible to render
 * PatientSelectionBar and PatientFetchSelect components
 */
class PatientList extends React.Component {
  /**
   * render() is the main component lifecycle method
   * and is responsible for describing the view to
   * be rendered to the browser.
   */
  render() {
    return (
      <div>
        <PatientSelectionBar />
        <PatientFetchSelect />
      </div>
    );
  }
}

/**
 * Exporting PatientList as the default export
 */
export default PatientList;
