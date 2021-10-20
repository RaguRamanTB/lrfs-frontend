import React from "react";
import { Link } from "react-router-dom";
import "../../resources/table.css";

/**
 * Table class component that renders the list of
 * callback/completed patients in a table format
 */
class Table extends React.Component {
  /**
   * Render the lab test column for each row of the table
   *
   * @param {object} patient - Patient details containing the tests taken
   * @returns Lab Test details under <div></div> tag
   */
  renderTestResult = (patient) => {
    var { t_NAME, normal_RANGE, t_RESULT, t_UNITS } = patient[
      patient.length - 1
    ];
    const range = normal_RANGE.split("-");
    const min = range[0];
    const max = range[1];
    const degree = "\u00B0";
    var className = "tag is-medium ";
    if (normal_RANGE === "--") {
      className += "is-info";
    } else if (t_RESULT < min || t_RESULT > max) {
      className += "is-danger";
    } else {
      className += "is-success";
    }
    if (t_UNITS === "degC") {
      t_UNITS = degree + "C";
    }
    t_RESULT = t_RESULT + " " + t_UNITS;
    normal_RANGE = normal_RANGE + " " + t_UNITS;
    return (
      <div className="columns is-vcentered">
        <div className="column">
          <p>{t_NAME}</p>
          <p>{normal_RANGE}</p>
        </div>
        <div className="column">
          <span className={className}>{t_RESULT}</span>
        </div>
      </div>
    );
  };

  /**
   * Render row of the table
   *
   * @param {object} patientDetails - Details of the patient
   * @returns Table row under <tr></tr> tag
   */
  renderRow = (patientDetails) => {
    const {
      t_ID,
      pat_ID,
      pat_NAME,
      patient: { comments },
    } = patientDetails[patientDetails.length - 1];
    const { status, comment, commented_AT } = comments[comments.length - 1];
    const currentDate = new Date().getTime();
    const modDate = new Date(commented_AT).getTime();
    const diffTime = currentDate - modDate;
    const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));
    return (
      <tr key={t_ID}>
        <td>
          <Link to={`/patient/${pat_ID}`}>{pat_NAME}</Link>
        </td>
        <td>{this.renderTestResult(patientDetails)}</td>
        <td>
          <strong>{status}</strong>
        </td>
        <td>{comment}</td>
        <td>{`${diffDays} days ago`}</td>
      </tr>
    );
  };

  /**
   * render() is the main component lifecycle method
   * and is responsible for describing the view to
   * be rendered to the browser.
   */
  render() {
    const { patients } = this.props;
    return (
      <table className="styled-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Result</th>
            <th>Status</th>
            <th>Comment</th>
            <th>Last Update</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(patients).map((patient) => {
            return this.renderRow(patients[patient]);
          })}
        </tbody>
      </table>
    );
  }
}

/**
 * Exporting Table as the default export
 */
export default Table;
