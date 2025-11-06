import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApmRoute } from "@elastic/apm-rum-react";
import { Logger } from "./logger"; // ✅ Import centralized logger

import HomePage from "./HomePage.react";
import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";
import AttendanceForm from "./AttendanceForm";
import ListAttendance from "./AttendanceList";
import ListSalary from "./ListSalary";

import "tabler-react/dist/Tabler.css";

type Props = {||};

// ------------------ OPTIONAL APM SETUP ------------------
// import { init as initApm } from "@elastic/apm-rum";
// initApm({
//   serverUrl: "http://apm-server:8200",
//   serviceName: "frontend",
//   instrument: "false"
// });
// --------------------------------------------------------

function App(props: Props): React.Node {
  React.useEffect(() => {
    Logger.info("✅ Frontend App initialized successfully");
    Logger.debug("🔍 Debug mode active - tracking component routes");
    Logger.warn("⚠️ This is a test warning log from frontend");
    Logger.error("❌ Sample error log for testing Promtail");
    Logger.critical("🔥 Critical issue simulation for frontend monitoring");
    Logger.info("App Component Mounted ✅");
  }, []);

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <ApmRoute exact path="/" component={HomePage} />
          <ApmRoute exact path="/employee-add" component={EmployeeForm} />
          <ApmRoute exact path="/employee-list" component={EmployeeList} />
          <ApmRoute exact path="/attendance-add" component={AttendanceForm} />
          <ApmRoute exact path="/attendance-list" component={ListAttendance} />
          <ApmRoute exact path="/salary-list" component={ListSalary} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;

