/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import appicon from "../resources/appicon.png";
import sync from "../resources/sync.png";
import { connect } from "react-redux";
import { fetchCallbackPatients, fetchCompletedPatients } from "../actions";

/**
 * NavigationBar class based component that is used
 * in the application
 */
class NavigationBar extends React.Component {
  /**
   * Component level state that holds refresh time
   */
  state = {
    date: new Date(),
    lastRefresh: new Date(),
  };

  /**
   * componentDidMount() is a component lifecycle method
   * and is invoked immediately after the component
   * is mounted (inserted into the tree). This is to initiate the
   * timer.
   */
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 60000);
  }

  /**
   * componentWillUnmount() is a component lifecycle method
   * and is invoked if the component
   * will get unmounted (removed from the tree). This is to stop the
   * timer.
   */
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  /**
   * Function that executes in the intervals
   */
  tick() {
    this.setState({
      date: new Date(),
    });
  }

  /**
   * Function to fetch the values of callback and completed
   * patients on refresh click
   */
  fetchValues = () => {
    if (this.props.currentLocationIDs != null) {
      this.props.fetchCallbackPatients(this.props.currentLocationIDs);
      this.props.fetchCompletedPatients(this.props.currentLocationIDs);
    }
  };

  /**
   * render() is the main component lifecycle method
   * and is responsible for describing the view to
   * be rendered to the browser.
   */
  render() {
    return (
      <div>
        <nav
          className="navbar"
          data-test="navbar"
          style={{
            backgroundColor: "#DECFCF",
          }}
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand" data-test="navbar-brand">
            <Link to="/" className="navbar-item">
              <img src={appicon} width="30" height="30" alt="App Icon" />
            </Link>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <div className="navbar-item">
                <strong>Lab Report Follow-Up System</strong>
              </div>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div data-test="navbar-buttons" className="buttons">
                  <Link to="/register" className="button is-info">
                    Register a new patient
                  </Link>
                  <button
                    type="button"
                    className="button is-light"
                    onClick={() => {
                      this.fetchValues();
                      this.setState({
                        lastRefresh: new Date(),
                        date: new Date(),
                      });
                    }}
                  >
                    <img src={sync} alt="Refresh" height="20px" width="20px" />
                    <p style={{ marginLeft: "5px" }}>
                      {Math.abs(
                        parseInt(this.state.date.getMinutes()) -
                          parseInt(this.state.lastRefresh.getMinutes())
                      )}{" "}
                      minutes ago
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
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
    currentLocationIDs: state.currentLocationIDs.currentLocationIDs,
  };
};

/**
 * Exporting NavigationBar component as the default export
 */
export default connect(mapStateToProps, {
  fetchCallbackPatients,
  fetchCompletedPatients,
})(NavigationBar);
