import React from "react";
import { Field, formValueSelector, reduxForm, change } from "redux-form";
import Select from "react-select";
import $ from "jquery";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "../../resources/form.css";

/**
 * PatientCreateForm class component that renders
 * the patient registration form.
 */
class PatientCreateForm extends React.Component {
  /**
   * componentDidMount() is a component lifecycle method
   * and is invoked immediately after the component
   * is mounted (inserted into the tree)
   */
  componentDidMount() {
    $("input").on("wheel", function (event) {
      // event.preventDefault();
      $(this).blur();
    });
  }

  /**
   * Method to calculate current date.
   *
   * @returns Current date in yyyy-mm-dd format.
   */
  getTodaysDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };

  /**
   * Method to calculate current time.
   *
   * @returns Current time in hh:mm format.
   */
  getCurrentTime = () => {
    var today = new Date();
    var hh = today.getHours();
    var mm = today.getMinutes();
    if (hh < 10) {
      hh = "0" + hh;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = hh + ":" + mm;
    return today;
  };

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
   * Method to get DOB value from formValues, pass it to getAgeFromDOB()
   * method and change AGE field.
   */
  calculateAge = () => {
    var dob = this.props.dob;
    if (dob != null) {
      const age = this.getAgeFromDOB(dob);
      this.props.change("pat_AGE", age);
    }
  };

  /**
   * Method to get age in time value from formValues, compare
   * with current time and change AGE field.
   */
  calculateAgeTime = () => {
    var ageTime = this.props.ageTime;
    if (ageTime != null) {
      var currentTime = this.getCurrentTime().toString();
      currentTime = currentTime.split(":");
      ageTime = ageTime.split(":");
      var currentDate = new Date(0, 0, 0, currentTime[0], currentTime[1], 0);
      var ageDate = new Date(0, 0, 0, ageTime[0], ageTime[1], 0);
      var diff = currentDate.getTime() - ageDate.getTime();
      if (diff < 0 || diff === 0) {
        this.props.change("pat_AGE", "Invalid Time Selected");
      } else {
        var hh = Math.floor(diff / 1000 / 60 / 60);
        diff -= hh * 1000 * 60 * 60;
        var mm = Math.floor(diff / 1000 / 60);
        var minText = "";
        if (mm === 1) {
          minText = "minute";
        } else {
          minText = "minutes";
        }
        var hourText = "";
        if (hh === 1) {
          hourText = "hour";
        } else {
          hourText = "hours";
        }
        this.props.change("pat_AGE", `${hh} ${hourText} ${mm} ${minText}`);
      }
    }
  };

  /**
   * Method to check if the selected DOB is today's date,
   * so as to render time input.
   *
   * @returns Component with time input
   */
  checkForToday = () => {
    var dob = this.props.dob;
    if (dob != null && dob === this.getTodaysDate()) {
      return (
        <Field
          name="pat_AGE_TIME"
          component={this.renderTimeInput}
          label="Time of Birth"
        />
      );
    }
    return null;
  };

  /**
   * Method that renders the error message component.
   *
   * @param {boolean} error - Meta data (error)
   * @param {boolean} touched - Meta data (touched)
   * @returns Error message inside <p></p> tag.
   */
  renderError({ error, touched }) {
    if (touched && error) {
      return <p className="help is-danger">{error}</p>;
    }
  }

  /**
   * Method that renders mandatory time input field component.
   *
   * @param {object} input - Contains input tag attributes
   * @param {string} label - Contains label for the field
   * @param {object} meta - Contains meta details of the input
   * @returns Mandatory time input field
   */
  renderTimeInput = ({ input, label, meta }) => {
    const className = `input is-${
      meta.error && meta.touched ? "danger" : "success"
    }`;
    return (
      <div className="field">
        <label className="label">
          {label}
          <sup style={{ fontSize: "12px", color: "red" }}> *</sup>
        </label>
        <input type="time" className={className} {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  /**
   * Method that renders any mandatory text input field component.
   *
   * @param {object} input - Contains input tag attributes
   * @param {string} label - Contains label for the field
   * @param {object} meta - Contains meta details of the input
   * @returns Mandatory text input field
   */
  renderInput = ({ input, label, meta }) => {
    const className = `input is-${
      meta.error && meta.touched ? "danger" : "success"
    }`;
    return (
      <div className="field">
        <label className="label">
          {label}
          <sup style={{ fontSize: "12px", color: "red" }}> *</sup>
        </label>
        <input className={className} {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  /**
   * Method that renders the Age input field component.
   *
   * @param {object} input - Contains input tag attributes
   * @param {string} label - Contains label for the field
   * @param {object} meta - Contains meta details of the input
   * @returns Age input field
   */
  renderAgeInput = ({ input, label, meta }) => {
    const className = `input is-${
      meta.error && meta.touched ? "danger" : "success"
    }`;
    return (
      <div className="field">
        <label className="label">
          {label}
          <sup style={{ fontSize: "12px", color: "red" }}> *</sup>
        </label>
        <input className={className} {...input} autoComplete="off" disabled />
      </div>
    );
  };

  /**
   * Method that renders the date of birth input field component.
   *
   * @param {object} input - Contains input tag attributes
   * @param {string} label - Contains label for the field
   * @param {object} meta - Contains meta details of the input
   * @returns Date of Birth input field
   */
  renderDateInput = ({ input, label, meta }) => {
    const className = `input is-${
      meta.error && meta.touched ? "danger" : "success"
    }`;
    const date = this.getTodaysDate();
    return (
      <div className="field">
        <label className="label">
          {label}
          <sup style={{ fontSize: "12px", color: "red" }}> *</sup>
        </label>
        <input type="date" className={className} {...input} max={date} />
        {this.renderError(meta)}
      </div>
    );
  };

  /**
   * Method that renders the mobile number input field component.
   *
   * @param {object} input - Contains input tag attributes
   * @param {string} label - Contains label for the field
   * @param {object} meta - Contains meta details of the input
   * @returns Mobile Number input field
   */
  renderContactInput = ({ input, label, meta }) => {
    const className = `input is-${
      meta.error && meta.touched ? "danger" : "success"
    }`;
    return (
      <div className="field">
        <label className="label">
          {label}
          <sup style={{ fontSize: "12px", color: "red" }}> *</sup>
        </label>
        <p className="control has-icons-left">
          <input
            type="number"
            className={className}
            {...input}
            autoComplete="off"
          />
          <span className="icon is-small is-left">+91</span>
        </p>
        {this.renderError(meta)}
      </div>
    );
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
   * Method that renders any text input field component.
   *
   * @param {object} input - Contains input tag attributes
   * @param {string} label - Contains label for the field
   * @param {object} meta - Contains meta details of the input
   * @returns Text input field
   */
  renderNormalInput = ({ input, label, meta }) => {
    const className = `input is-${
      meta.error && meta.touched ? "danger" : "success"
    }`;
    return (
      <div className="field">
        <label className="label">{label}</label>
        <input className={className} {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  /**
   * Method that renders any number input field component.
   *
   * @param {object} input - Contains input tag attributes
   * @param {string} label - Contains label for the field
   * @param {object} meta - Contains meta details of the input
   * @returns Number input field
   */
  renderNormalNumberInput = ({ input, label, meta }) => {
    const className = `input is-${
      meta.error && meta.touched ? "danger" : "success"
    }`;
    return (
      <div className="field">
        <label className="label">{label}</label>
        <input
          type="number"
          className={className}
          {...input}
          autoComplete="off"
        />
        {this.renderError(meta)}
      </div>
    );
  };

  /**
   * Method that renders any select input field component.
   *
   * @param {object} input - Contains input tag attributes
   * @param {string} label - Contains label for the field
   * @param {object} meta - Contains meta details of the input
   * @returns Select input field
   */
  renderDropdown = ({ input, label, options, meta }) => {
    return (
      <div className="field">
        <label className="label">
          {label}
          <sup style={{ fontSize: "12px", color: "red" }}> *</sup>
        </label>
        <Select
          {...input}
          className="basic-single"
          onChange={(value) => input.onChange(value)}
          onBlur={() => input.onBlur(input.value)}
          options={options}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  /**
   * render() is the main component lifecycle method
   * and is responsible for describing the view to
   * be rendered to the browser.
   */
  render() {
    const genderOptions = [
      {
        label: "Male",
        value: "MALE",
      },
      {
        label: "Female",
        value: "FEMALE",
      },
      {
        label: "Prefer not to say",
        value: "PREFER NOT TO SAY",
      },
    ];
    const bloodGroupOptions = [
      {
        label: "A+ve",
        value: "A+ve",
      },
      {
        label: "A-ve",
        value: "A-ve",
      },
      {
        label: "B+ve",
        value: "B+ve",
      },
      {
        label: "B-ve",
        value: "B-ve",
      },
      {
        label: "O+ve",
        value: "O+ve",
      },
      {
        label: "O-ve",
        value: "O-ve",
      },
      {
        label: "AB+ve",
        value: "AB+ve",
      },
      {
        label: "AB-ve",
        value: "AB-ve",
      },
    ];
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <div style={{ fontSize: "15px", marginBottom: "12px" }}>
          <sup style={{ fontSize: "12px", color: "red" }}> (*)</sup> fields are
          mandatory.
        </div>
        <Field
          name="pat_FIRSTNAME"
          component={this.renderInput}
          label="First Name"
        />
        <Field
          name="pat_LASTNAME"
          component={this.renderInput}
          label="Last Name"
        />
        <Field
          name="pat_GENDER"
          component={this.renderDropdown}
          label="Gender"
          options={genderOptions}
        />
        <Field
          name="pat_DOB"
          component={this.renderDateInput}
          label="Date of Birth"
        />
        {this.calculateAge()}
        {this.checkForToday()}
        {this.calculateAgeTime()}
        <Field name="pat_AGE" component={this.renderAgeInput} label="Age" />
        <Field
          name="pat_ADDRESS"
          component={this.renderInput}
          label="Address"
        />
        <Field
          name="pat_CONTACT"
          component={this.renderContactInput}
          label="Mobile Number"
        />
        <Field
          name="pat_BLOODGROUP"
          component={this.renderDropdown}
          label="Blood Group"
          options={bloodGroupOptions}
        />
        <Field
          name="pat_EMAIL"
          component={this.renderNormalInput}
          label="Email ID"
        />
        <Field
          name="pat_INSURANCE_ID"
          component={this.renderNormalInput}
          label="Insurance ID"
        />
        <Field
          name="pat_HEIGHT"
          component={this.renderNormalNumberInput}
          label="Height (in CMs)"
        />
        <Field
          name="pat_WEIGHT"
          component={this.renderNormalNumberInput}
          label="Weight (in KGs)"
        />
        <footer className="modal-card-foot">
          <button className="button is-link">Submit</button>
        </footer>
      </form>
    );
  }
}

/**
 * Method to calculate current time.
 *
 * @returns Current time in hh:mm format.
 */
const getCurrentTime = () => {
  var today = new Date();
  var hh = today.getHours();
  var mm = today.getMinutes();
  if (hh < 10) {
    hh = "0" + hh;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = hh + ":" + mm;
  return today;
};

/**
 * Validation function to validate input fields.
 *
 * @param {object} formValues
 * @returns Errors of each form field
 */
const validate = (formValues) => {
  const errors = {};
  const emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const contactFormat = /^[6-9]\d{9}$/i;
  if (!formValues.pat_FIRSTNAME) {
    errors.pat_FIRSTNAME = "You must enter patient's first name";
  }
  if (!formValues.pat_LASTNAME) {
    errors.pat_LASTNAME = "You must enter patient's last name";
  }
  if (!formValues.pat_ADDRESS) {
    errors.pat_ADDRESS = "You must enter patient's address";
  }
  if (!formValues.pat_BLOODGROUP) {
    errors.pat_BLOODGROUP = "You must enter patient's blood group";
  }
  if (!formValues.pat_CONTACT) {
    errors.pat_CONTACT = "You must enter patient's contact number";
  }
  if (formValues.pat_CONTACT != null) {
    if (formValues.pat_CONTACT.length !== 10) {
      errors.pat_CONTACT =
        "Invalid phone number. Contact number must be 10 digits, with a prefix +91, starting with 6,7,8, or 9.";
    }
    if (!contactFormat.test(formValues.pat_CONTACT)) {
      errors.pat_CONTACT =
        "Invalid phone number. Contact number must be 10 digits, with a prefix +91, starting with 6,7,8, or 9.";
    }
  }
  if (!formValues.pat_GENDER) {
    errors.pat_GENDER = "You must enter patient's gender";
  }
  if (!formValues.pat_DOB) {
    errors.pat_DOB = "You must enter patient's date of birth";
  }
  if (!formValues.pat_AGE_TIME) {
    errors.pat_AGE_TIME = "You must enter patient's time of birth";
  }
  if (formValues.pat_AGE_TIME != null) {
    const currentTime = getCurrentTime();
    const ageTime = formValues.pat_AGE_TIME;
    if (
      parseInt(ageTime.substring(0, 2)) >
        parseInt(currentTime.substring(0, 2)) ||
      (parseInt(ageTime.substring(0, 2)) ===
        parseInt(currentTime.substring(0, 2)) &&
        parseInt(ageTime.substring(3, 5)) >=
          parseInt(currentTime.substring(3, 5)))
    ) {
      errors.pat_AGE_TIME =
        "Invalid time selected, time of birth exceeds or equals to the current time.";
    }
  }
  if (formValues.pat_AGE != null) {
    var age = formValues.pat_AGE;
    age = age.substring(0, age.indexOf(" "));
    if (parseInt(age) > 160) {
      errors.pat_DOB =
        "Commonly accepted and maximum known lifespan is 140 to 160 years. Please enter a valid date of birth";
    }
  }
  if (formValues.pat_EMAIL != null) {
    if (!emailFormat.test(formValues.pat_EMAIL)) {
      errors.pat_EMAIL = "Invalid email format";
    }
  }
  if (formValues.pat_HEIGHT != null) {
    if (parseInt(formValues.pat_HEIGHT) < 1) {
      errors.pat_HEIGHT = "Patient's height must be greater than 0.";
    }
  }
  if (formValues.pat_WEIGHT != null) {
    if (parseInt(formValues.pat_WEIGHT) < 1) {
      errors.pat_WEIGHT = "Patient's weight must be greater than 0.";
    }
  }
  return errors;
};

/**
 * Method to map dispatch to props.
 *
 * @param {object} dispatch - The action creator that has a dispatch method
 * @returns Binded Action Creators
 */
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ change }, dispatch);
};

/**
 * Redux Form - patientCreateForm
 */
var patientCreateForm = reduxForm({
  form: "patientCreateForm",
  validate,
})(PatientCreateForm);

/**
 * Form Value Selector - selector
 */
const selector = formValueSelector("patientCreateForm");

/**
 * Function to connect state, and dispatch to props of the component
 */
patientCreateForm = connect((state) => {
  const dob = selector(state, "pat_DOB");
  const ageTime = selector(state, "pat_AGE_TIME");
  return { dob, ageTime };
}, mapDispatchToProps)(patientCreateForm);

/**
 * Exporting patientCreateForm as default export
 */
export default patientCreateForm;
