import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";
import TasksReport from "./components/Reports/TasksReport";
import ResourcesReport from "./components/Reports/ResourcesReport";
import TasksResourcesReport from "./components/Reports/TasksResourcesReport";
import TasksCostReport from "./components/Reports/TasksCostReport";
import ProjectCostReport from "./components/Reports/ProjectCostReport";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#1a237e",
    },
    secondary: {
      main: "#bf360c",
      light: "rgba(197,197,197,0.75)",
    },
    text: {
      primary: "#000000",
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* <AppBar /> */}
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/tasks-report" component={TasksReport} />
          <Route exact path="/resources-report" component={ResourcesReport} />
          <Route
            exact
            path="/tasks-resources-report"
            component={TasksResourcesReport}
          />
          <Route exact path="/tasks-cost-report" component={TasksCostReport} />
          <Route
            exact
            path="/project-cost-report"
            component={ProjectCostReport}
          />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
