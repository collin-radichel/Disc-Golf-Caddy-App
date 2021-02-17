import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { useDispatch } from "react-redux";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import Dashboard from "../Dashboard/Dashboard";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import AddDisc from "../AddDisc/AddDisc";
import Inventory from "../Inventory/Inventory";
import DiscDetails from "../DiscDetails/DiscDetails"
import EditDisc from "../EditDisc/EditDisc"
import DiscSuggestion from "../DiscSuggestion/DiscSuggestion"
import DiscSuggestionResults from "../DiscSuggestionResults/DiscSuggestionResults"

import "./App.css";

const font = "'Mukta', sans-serif;";

const theme = createMuiTheme({
  typography: {
    fontFamily: font,
    allVariants: {
      // color: "#FFFFFF",
    },
  },
  palette: {
    primary: {
      main: "#1b5e20",
    },
    secondary: {
      main: "#8d6e63",
    }
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
            >
              <Dashboard />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
            >
              <InfoPage />
            </ProtectedRoute>

            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              authRedirect="/user"
            >
              <LoginPage />
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              authRedirect="/user"
            >
              <RegisterPage />
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LandingPage at "/home"
              exact
              path="/home"
              authRedirect="/user"
            >
              <LandingPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/addDisc">
              <AddDisc />
            </ProtectedRoute>

            <ProtectedRoute exact path="/inventory">
              <Inventory />
            </ProtectedRoute>

            <ProtectedRoute exact path="/discDetails/:id">
              <DiscDetails />
            </ProtectedRoute>

            <ProtectedRoute exact path ="/editDisc/:id">
              <EditDisc/>
            </ProtectedRoute>

            <ProtectedRoute exact path ="/discSuggestion">
              <DiscSuggestion/>
            </ProtectedRoute>

            <ProtectedRoute exact path ="/discSuggestionResults">
              <DiscSuggestionResults/>
            </ProtectedRoute>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
