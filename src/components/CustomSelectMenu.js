import React, { Fragment } from "react";
import { components } from "react-select";

/**
 * Functional Menu UI component for Facility dropdown
 *
 * @param {object} props - Props passed to the React Select Menu
 * @returns React fragment containing the Facility dropdown menu
 */
const Menu = (props) => {
  const buttonStyle = {
    fontFamily: "'Ubuntu', sans-serif",
    fontSize: "15px",
    border: "1px double #EEE",
    color: "rgb(41, 146, 208)",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    cursor: "pointer",
    padding: "10px 0px 10px 0px",
    fontWeight: "bold",
  };
  return (
    <Fragment>
      <components.Menu {...props}>
        <div>
          <button
            style={buttonStyle}
            type="button"
            onClick={props.selectProps.selectAll}
          >
            Select all
          </button>
          {props.children}
          <button
            style={buttonStyle}
            type="button"
            onClick={props.selectProps.fetchLocations}
          >
            Search
          </button>
        </div>
      </components.Menu>
    </Fragment>
  );
};

/**
 * Exporting Menu component as the default export
 */
export default Menu;
