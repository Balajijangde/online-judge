import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import "./App.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import ProblemScreen from "./screen/problem_screen";
import ProblemsScreen from "./screen/problems_screen";
import LoginComponent from "./screen/login_componenet";
import { OJ_TOKEN_KEY } from "./common/constants";
import LogoutComponent from "./screen/logout_component";
import WelcomeComponent from "./screen/welcome_component";
import { Action, action, createStore, StoreProvider } from "easy-peasy";
import SignupComponent from "./screen/signup_component";
import ForgotPasswordComponent from "./screen/forgot_password_component";
import ForgotPasswordConfirmationComponent from "./screen/forgot_password_confirmation_component";
import { useStoreActions, useStoreState } from "./hooks";
import SubmissionComponent from "./screen/submission_component";

export interface StoreModel {
  isLoggedIn: boolean;
  setIsLoggedIn: Action<StoreModel, boolean>;
}

const store = createStore<StoreModel>({
  isLoggedIn: false,
  setIsLoggedIn: action((state, payload) => {
    state.isLoggedIn = payload;
  }),
});

const App = () => {
  const setIsLoggedIn = useStoreActions((actions) => actions.setIsLoggedIn);
  const isLoggedIn = useStoreState((state) => state.isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem(OJ_TOKEN_KEY) === null) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Navbar bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand className="white">Creatish Judge</Navbar.Brand>
          <Nav>
            <Nav.Link className="white" href="/">
              Home
            </Nav.Link>
            <Nav.Link className="white" href="/problems">
              Problems
            </Nav.Link>
            {isLoggedIn ? (
              <Nav.Link
                className="white"
                href="/logout"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem(OJ_TOKEN_KEY);
                  setIsLoggedIn(false);
                  window.location.reload();
                }}
              >
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link className="white" href="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/problems" element={<ProblemsScreen />} />
        <Route path="/problems/:problemId" element={<ProblemScreen />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route
          path="/forgotPassword/:email/:token"
          element={<ForgotPasswordConfirmationComponent />}
        />
        <Route path="/forgotPassword" element={<ForgotPasswordComponent />} />
        <Route path="/submission/:id" element={<SubmissionComponent />} />
        <Route path="/" element={<WelcomeComponent />} />
      </Routes>
    </Router>
  );
};
const StoreProviderOverride = StoreProvider as any;

const RootApp = () => {
  return (
    <StoreProviderOverride store={store}>
      <App />
    </StoreProviderOverride>
  );
};

export default RootApp;
