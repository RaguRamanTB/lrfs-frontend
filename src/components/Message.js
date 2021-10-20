import React from "react";
import $ from "jquery";
import { resetCreatePatientMessage } from "../actions";
import { connect } from "react-redux";

/**
 * Message component that renders the success/failure message
 * after patient registration
 */
class Message extends React.Component {
  /**
   * componentDidMount() is a component lifecycle method
   * and is invoked immediately after the component
   * is mounted (inserted into the tree).
   */
  componentDidMount() {
    $("#success").show();
    $("#failure").show();
  }

  /**
   * Method to remove success message
   */
  removeSuccessArticle = () => {
    $("#success").hide();
    this.props.resetCreatePatientMessage();
  };

  /**
   * Method to remove failure message
   */
  removeFailureArticle = () => {
    $("#failure").hide();
    this.props.resetCreatePatientMessage();
  };

  /**
   * render() is the main component lifecycle method
   * and is responsible for describing the view to
   * be rendered to the browser.
   */
  render() {
    if (!this.props.error && this.props.loaded && !this.props.loading) {
      $("#success").show();
      return (
        <article id="success" className="message is-success">
          <div className="message-header">
            <p>Success</p>
            <button
              className="delete"
              onClick={this.removeSuccessArticle}
              aria-label="close"
            ></button>
          </div>
          <div className="message-body">Patient data has been created.</div>
        </article>
      );
    }
    if (Array.isArray(this.props.error) && this.props.error) {
      $("#failure").show();
      return (
        <article id="failure" className="message is-danger">
          <div className="message-header">
            <p>Failure</p>
            <button
              className="delete"
              onClick={this.removeFailureArticle}
              aria-label="close"
            ></button>
          </div>
          <div className="message-body">
            {this.props.error.map((error, i) => {
              return (
                <div key={i}>
                  {i + 1}. {error.defaultMessage}
                </div>
              );
            })}
          </div>
        </article>
      );
    }
    if (typeof this.props.error === "object" && this.props.error !== null) {
      $("#failure").show();
      return (
        <article id="failure" className="message is-danger">
          <div className="message-header">
            <p>Failure</p>
            <button
              className="delete"
              onClick={this.removeFailureArticle}
              aria-label="close"
            ></button>
          </div>
          <div className="message-body">{this.props.error.message}</div>
        </article>
      );
    }
    return null;
  }
}

/**
 * Exporting Message as default export while
 * connecting dispatch to props of the component
 */
export default connect(null, { resetCreatePatientMessage })(Message);
