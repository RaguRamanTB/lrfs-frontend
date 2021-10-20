import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, testStore } from "../../../utils";
import App from "../App";

const setUp = (initialState = {}) => {
  const tStore = testStore(initialState);
  const component = shallow(<App store={tStore} />)
    .childAt(0)
    .dive();
  return component;
};

describe("App Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("should render without errors", () => {
    const navbar = findByTestAttr(component, "application-navbar");
    expect(navbar.length).toBe(1);
  });
});
