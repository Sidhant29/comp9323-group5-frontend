import "./App.css";
import Home from "./Pages/home";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Navigation from "./Components/navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <Navigation />
      <Router>
        <Switch>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
