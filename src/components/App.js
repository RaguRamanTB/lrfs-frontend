import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import PatientList from "./patients/PatientList";
import PatientCreate from "./patients/PatientCreate";
import history from "../history";
import PatientModal from "./patients/PatientModal";

/**
 * Functional Component that uses React Router
 * to route to different components.
 *
 * @returns Main page of the application with different routes routing to different components
 */
const App = () => {
  return (
    <div>
      <Router history={history}>
        <NavigationBar data-test="application-navbar" />
        <div style={{ backgroundColor: "#FFF5EF" }}>
          <Switch>
            <Route path="/" exact component={PatientList} />
            <Route path="/register" exact component={PatientCreate} />
            <Route path="/patient/:id" exact component={PatientModal} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

/**
 * Exporting App component as the default export
 */
export default App;
