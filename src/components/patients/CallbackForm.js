import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import $ from "jquery";
import { resetCallbackForm } from "../../actions";

/**
 * CallbackForm class component that renders the
 * form in callback patient modal.
 */
class CallbackForm extends React.Component {
  /**
   * Method that renders radio input field component.
   *
   * @param {object} input - Contains input tag attributes
   * @param {array} items - Contains items for the radio input
   * @param {string} name - Contains name for the radio input
   * @param {object} meta - Contains meta details of the input
   * @returns Radio input field
   */
  renderRadioInput = ({ input, items, name, meta: { touched, error } }) => {
    return (
      <div className="field">
        <div className="control">
          <label className="label">Comment</label>
          {items.map((item, i) => (
            <div key={i}>
              <label className="radio mr-2">
                <input
                  {...input}
                  name={name}
                  type="radio"
                  value={item.value}
                  checked={input.value === item.value}
                />
                <span className="ml-1">{item.label}</span>
              </label>
              <br />
            </div>
          ))}
          {this.renderError(touched, error)}
        </div>
      </div>
    );
  };

  /**
   * Method that renders text area input field component.
   *
   * @param {object} input - Contains input tag attributes
   * @param {string} label - Contains label for the input
   * @param {object} meta - Contains meta details of the input
   * @returns Text Area input field
   */
  renderTextArea = ({ input, label, meta: { touched, error } }) => {
    const className = `textarea is-${error && touched ? "danger" : "success"}`;
    return (
      <div className="field">
        <label className="label">{label}</label>
        <textarea
          className={className}
          {...input}
          placeholder="Description of the comment"
        />
        {this.renderError(touched, error)}
      </div>
    );
  };

  /**
   * Method that renders checkbox input field component.
   *
   * @param {object} input - Contains input tag attributes
   * @param {string} label - Contains label for the input
   * @returns Checkbox input field
   */
  renderCheckbox = ({ input, label }) => {
    return (
      <div className="field">
        <label className="checkbox mr-2">
          <input id="actionCheckbox" {...input} type="checkbox" />
          <span className="ml-1">{label}</span>
        </label>
      </div>
    );
  };

  /**
   * Component that renders the error message.
   *
   * @param {boolean} error - Meta data (error)
   * @param {boolean} touched - Meta data (touched)
   * @returns Error message inside <p></p> tag.
   */
  renderError = (touched, error) => {
    if (touched && error) {
      return <p className="help is-danger">{error}</p>;
    }
  };

  /**
   * Handles form submission
   *
   * @param {object} formValues - Contains the form values.
   */
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  /**
   * render() is the main component lifecycle method
   * and is responsible for describing the view to
   * be rendered to the browser.
   */
  render() {
    return (
      <article className="message is-dark">
        <div className="message-header">
          <p>Callback</p>
        </div>
        <div className="message-body">
          <div
            className="columns is-vcentered is-centered"
            style={{ borderBottom: "1px solid #FFE4E6" }}
          >
            <div className="column has-text-centered">
              <p>
                <strong>Home - Address</strong>
              </p>
              <p>{this.props.patientDetail.pat_ADDRESS}</p>
            </div>
            <div className="column has-text-centered">
              <p>
                <strong>Mobile - Primary</strong>
              </p>
              <p>{this.props.patientDetail.pat_CONTACT}</p>
            </div>
            <div className="column has-text-centered">
              <p>
                <strong>Email ID - Primary</strong>
              </p>
              <p>{this.props.patientDetail.pat_EMAIL}</p>
            </div>
            <div className="column has-text-centered">
              <p>
                <strong>Mobile - Work</strong>
              </p>
              <p> -- </p>
            </div>
          </div>
          <br />
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field
              name="status"
              component={this.renderRadioInput}
              items={[
                {
                  label: "No Answer",
                  value: "No Answer",
                },
                {
                  label: "Left Message",
                  value: "Left Message",
                },
                {
                  label: "Patient Contacted",
                  value: "Patient Contacted",
                },
              ]}
              required={true}
            />
            <Field name="comment" component={this.renderTextArea} />
            <Field
              name="action"
              component={this.renderCheckbox}
              label="No further action required"
              required={true}
            />
            <div className="buttons is-right">
              <button
                className="button is-danger"
                type="button"
                onClick={() => {
                  $("#actionCheckbox").prop("checked", false);
                  this.props.resetCallbackForm();
                }}
              >
                Cancel
              </button>
              <button className="button is-success" type="submit">
                Sign
              </button>
            </div>
          </form>
        </div>
      </article>
    );
  }
}

/**
 * Validation function to validate input fields.
 *
 * @param {object} formValues
 * @returns Errors of each form field
 */
const validate = (formValues) => {
  const errors = {};
  if (!formValues.status) {
    errors.status = "You must select a status.";
  }
  if (!formValues.comment) {
    errors.comment = "You must enter a comment";
  }
  return errors;
};

/**
 * Redux Form - callbackForm
 */
var callbackForm = reduxForm({
  form: "callbackForm",
  validate,
})(CallbackForm);

/**
 * Exporting callbackForm as default export while
 * connecting dispatch to props of the component
 */
export default connect(null, { resetCallbackForm })(callbackForm);
