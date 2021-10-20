import React, { Fragment } from "react";
import { components } from "react-select";

/**
 * Functional Menu UI component for Location Unit dropdown
 *
 * @param {object} props - Props passed to the React Select Menu
 * @returns React fragment containing the Location Unit dropdown menu
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
            onClick={props.selectProps.selectAllLocs}
          >
            Select all
          </button>
          {props.children}
        </div>
      </components.Menu>
    </Fragment>
  );
};

/**
 * Exporting Menu component as the default export
 */
export default Menu;
