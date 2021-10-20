import React from "react";
import { shallow } from "enzyme";
import NavigationBar from "../NavigationBar";
import { findByTestAttr, testStore } from "../../../utils";

const setUp = (initialState = {}) => {
  const tStore = testStore(initialState);
  const component = shallow(<NavigationBar store={tStore} />)
    .childAt(0)
    .dive();
  return component;
};

describe("NavigationBar Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("should render without errors", () => {
    const navbar = findByTestAttr(component, "navbar");
    expect(navbar.length).toBe(1);
  });

  it("should render a logo", () => {
    const navbarLogo = findByTestAttr(component, "navbar-brand");
    expect(navbarLogo.length).toBe(1);
  });

  it("should render set of buttons", () => {
    const navbarButtons = findByTestAttr(component, "navbar-buttons");
    expect(navbarButtons.length).toBe(1);
  });
});
