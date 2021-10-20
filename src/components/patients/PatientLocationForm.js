import React from "react";
import { Field, formValueSelector, reduxForm, change } from "redux-form";
import Select from "react-select";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Menu from "../CustomSelectMenu";
import MenuLoc from "../CustomSelectMenuLoc";
import { fetchLocations } from "../../actions";
import _ from "lodash";

/**
 * PatientLocationForm class component that renders
 * the location selection form.
 */
class PatientLocationForm extends React.Component {
  /**
   * Component constructor that has component level state
   * and other variables.
   */
  constructor() {
    super();
    this.clOptions = null;
    this.fcOptions = null;
    this.facilityRef = React.createRef();
    this.locationRef = React.createRef();
    this.state = {
      selectedClOptionState: null,
      buildNames: [],
      buildIds: [],
    };
  }

  /**
   * Method to format facility dropdown.
   *
   * @param {object} fc - Object containing facility details
   * @returns Formatted facility details to render in the dropdown
   */
  formatFCForSelect = (fc) => ({
    label: fc.fc_NAME,
    value: fc.fc_ID,
  });

  /**
   * Method to render options for facilities dropdown
   *
   * @returns Facility dropdown items
   */
  renderFcOptionItems = (selectedCl) => {
    if (this.props.criteriaLists.criteriaListItems != null) {
      const items = this.props.criteriaLists.criteriaListItems;
      const formattedItems = [];
      for (const item in items) {
        var fc = items[item];
        if (selectedCl != null) {
          if (fc.cl_ID === selectedCl.value) {
            fc.facilities.forEach((facility) => {
              facility = this.formatFCForSelect(facility);
              formattedItems.push(facility);
            });
          }
        }
      }
      return formattedItems;
    }
  };

  /**
   * Method to get location units from the selected
   * criteria list and facilities
   */
  fetchLocations = () => {
    this.props.change("loc_ID", "");
    const cl_ID = this.state.selectedClOptionState;
    const selectedFc = [];
    var ids = "";
    this.props.facilities.forEach((fc) => {
      selectedFc.push(fc.value);
    });
    const items = this.props.criteriaLists.criteriaListItems;
    const buildIds = [];
    const buildNames = [];
    for (const item in items) {
      var fc = items[item];
      if (fc.cl_ID === cl_ID.value) {
        fc.facilities.forEach((facility) => {
          if (selectedFc.includes(facility.fc_ID)) {
            facility.buildings.forEach((build) => {
              buildIds.push(build.build_ID);
              buildNames.push(build.build_NAME);
            });
          }
        });
      }
    }
    if (buildIds.length !== 0) {
      var i;
      for (i = 0; i < buildIds.length; i++) {
        ids += buildIds[i];
        if (i !== buildIds.length - 1) {
          ids += ",";
        }
      }
      this.props.fetchLocations(ids);
      this.setState({
        buildNames: buildNames,
        buildIds: buildIds,
      });
    }
  };

  /**
   * Method for selecting all options under facilities dropdown
   */
  selectAll = () => {
    this.props.change(
      "fc_ID",
      this.renderFcOptionItems(this.state.selectedClOptionState)
    );
  };

  /**
   * Method for selecting all options under location units dropdown
   */
  selectAllLocs = () => {
    const locOptions = this.renderLocOptionItems();
    const allOptions = [];
    locOptions.forEach((lc) => {
      lc.options.forEach((opt) => {
        allOptions.push(opt);
      });
    });
    this.props.change("loc_ID", allOptions);
  };

  /**
   * Handles change of criteria list dropdown
   *
   * @param {object} selectedOption Selected criteria list option
   */
  handleChange = (selectedOption) => {
    this.props.change("fc_ID", "");
    this.props.change("loc_ID", "");
    this.setState({
      selectedClOptionState: selectedOption,
    });
    this.props.change("cl_ID", selectedOption);
  };

  /**
   * Component that renders the error message.
   *
   * @param {boolean} error - Meta data (error)
   * @param {boolean} touched - Meta data (touched)
   * @returns Error message inside <p></p> tag.
   */
  renderError({ touched, error }) {
    if (touched && error) {
      return <p className="help is-dark">{error}</p>;
    }
  }

  /**
   * Handles form submission
   *
   * @param {object} formValues - Contains the form values.
   */
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  /**
   * Method that renders criteria list field component.
   *
   * @param {object} input - Contains input tag attributes
   * @param {string} label - Contains label for the field
   * @param {object} options - Contains options for the dropdown
   * @param {object} meta - Contains meta details of the input
   * @returns Criteria List input field
   */
  renderSingleDropdown = ({ input, label, options, meta }) => {
    return (
      <div className="field">
        <label className="label">{label}</label>
        <Select
          {...input}
          className="basic-single"
          // onChange={(value) => input.onChange(value)}
          isClearable={true}
          onChange={this.handleChange}
          onBlur={() => input.onBlur(input.value)}
          options={options}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  /**
   * Method that renders facilities field component.
   *
   * @param {object} input - Contains input tag attributes
   * @param {string} label - Contains label for the field
   * @param {object} options - Contains options for the dropdown
   * @param {object} meta - Contains meta details of the input
   * @returns Facility input field
   */
  renderMultiDropdown = ({ input, label, options, meta }) => {
    return (
      <div className="field">
        <label className="label">{label}</label>
        <Select
          {...input}
          ref={this.facilityRef}
          isMulti={true}
          isClearable={true}
          components={{ Menu }}
          className="basic-multi-select"
          onChange={(value) => input.onChange(value)}
          onBlur={() => input.onBlur(input.value)}
          selectAll={this.selectAll}
          fetchLocations={this.fetchLocations}
          closeMenuOnSelect={false}
          options={options}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  /**
   * Method that renders location units field component.
   *
   * @param {object} input - Contains input tag attributes
   * @param {string} label - Contains label for the field
   * @param {object} options - Contains options for the dropdown
   * @param {object} meta - Contains meta details of the input
   * @returns Location Unit input field
   */
  renderMultiGroupedDropdown = ({ input, label, options, meta }) => {
    const groupStyles = {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    };
    const groupBadgeStyles = {
      backgroundColor: "#EBECF0",
      borderRadius: "2em",
      color: "#172B4D",
      display: "inline-block",
      fontSize: 12,
      fontWeight: "normal",
      lineHeight: "1",
      minWidth: 1,
      padding: "0.16666666666667em 0.5em",
      textAlign: "center",
    };
    const formatGroupLabel = (data) => (
      <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
      </div>
    );
    return (
      <div className="field">
        <label className="label">{label}</label>
        <Select
          {...input}
          ref={this.locationRef}
          isMulti={true}
          isClearable={true}
          formatGroupLabel={formatGroupLabel}
          className="basic-multi-select"
          components={{ Menu: MenuLoc }}
          selectAllLocs={this.selectAllLocs}
          onChange={(value) => input.onChange(value)}
          closeMenuOnSelect={false}
          onBlur={() => input.onBlur(input.value)}
          options={options}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  /**
   * Method to format criteria list dropdown.
   *
   * @param {object} cl - Object containing criteria list details
   * @returns Formatted criteria list details to render in the dropdown
   */
  formatCLForSelect = (cl) => ({
    label: cl.cl_NAME,
    value: cl.cl_ID,
  });

  /**
   * Method to render options for criteria list dropdown
   *
   * @returns Criteria List dropdown items
   */
  renderClOptionItems = () => {
    if (this.props.criteriaLists.criteriaListItems != null) {
      const items = this.props.criteriaLists.criteriaListItems;
      const formattedItems = [];
      for (const item in items) {
        var cl = items[item];
        cl = this.formatCLForSelect(cl);
        formattedItems.push(cl);
      }
      return formattedItems;
    }
  };

  /**
   * Method to format location items in the location dropdown.
   *
   * @param {object} loc - Object containing location details
   * @returns Formatted location details to render in the location dropdown
   */
  formatLocOptions = (loc) => ({
    label: loc.loc_NAME,
    value: loc.loc_ID,
  });

  /**
   * Method to format location titles in the location dropdown.
   *
   * @param {string} build_NAME - Title of each location unit section
   * @param {object} options - Object containing options under each title
   * @returns Formatted location title details to render in the location dropdown
   */
  formatLocTitle = (build_NAME, options) => ({
    label: build_NAME,
    options: options,
  });

  /**
   * Method to render options for location unit dropdown
   *
   * @returns Location dropdown items
   */
  renderLocOptionItems = () => {
    const locOptions = [];
    if (this.props.locations.loaded === true) {
      var locs = this.props.locations.locations;
      const locsArray = [];
      for (const item in locs) {
        locsArray.push(locs[item]);
      }
      locs = _.groupBy(locsArray, "build_ID");
      for (const loc in locs) {
        const build_NAME = this.state.buildNames[
          this.state.buildIds.indexOf(parseInt(loc))
        ];
        var lc = locs[loc];
        const options = [];
        lc.forEach((locParse) => {
          options.push(this.formatLocOptions(locParse));
        });
        locOptions.push(this.formatLocTitle(build_NAME, options));
      }
    }
    return locOptions;
  };

  /**
   * render() is the main component lifecycle method
   * and is responsible for describing the view to
   * be rendered to the browser.
   */
  render() {
    this.clOptions = this.renderClOptionItems();
    this.fcOptions = this.renderFcOptionItems(this.state.selectedClOptionState);
    const locOptions = this.renderLocOptionItems();
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <div style={{ padding: "15px 20px", backgroundColor: "#F97171" }}>
          <div className="columns is-vcentered">
            <div className="column">
              <Field
                name="cl_ID"
                component={this.renderSingleDropdown}
                label="Criteria List"
                options={this.clOptions}
              />
            </div>
            <div className="column">
              <Field
                name="fc_ID"
                component={this.renderMultiDropdown}
                label="Facilities"
                options={this.fcOptions}
              />
            </div>
            <div className="column">
              <Field
                name="loc_ID"
                component={this.renderMultiGroupedDropdown}
                label="Locations"
                options={locOptions}
              />
            </div>
            <div className="column is-2">
              <button className="button is-link">Update List</button>
            </div>
          </div>
        </div>
      </form>
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
  if (formValues.cl_ID == null || _.isEmpty(formValues.cl_ID)) {
    errors.cl_ID = "You must select a criteria list";
  }
  if (formValues.fc_ID == null || formValues.fc_ID.length === 0) {
    errors.fc_ID = "Select atleast one facility.";
  }
  if (formValues.loc_ID == null || formValues.loc_ID.length === 0) {
    errors.loc_ID = "Select atleast one location unit.";
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
  return bindActionCreators({ change, fetchLocations }, dispatch);
};

/**
 * Method to map application level state values to
 * props of the component.
 *
 * @param {object} state - Component level state from redux store
 * @returns State values mapped to props
 */
const mapStateToProps = (state) => {
  const facilities = selector(state, "fc_ID");
  return {
    locations: state.locations,
    facilities: facilities,
  };
};

const patientLocationForm = reduxForm({
  form: "patientLocationForm",
  validate,
})(PatientLocationForm);

const selector = formValueSelector("patientLocationForm");

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(patientLocationForm);
