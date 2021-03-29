import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Tasks from "./pages/Tasks";

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
          <Route exact path="/tasks" component={Tasks} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
