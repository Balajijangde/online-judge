import React, {useState, useEffect} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";
import './App.css'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import ProblemScreen from './screen/problem_screen'
import ProblemsScreen from './screen/problems_screen';

const App = () => {
  return (<Router>
    <Navbar bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand className="white">Creatish Judge</Navbar.Brand>
          <Nav>
            <Nav.Link className="white" href="/">Home</Nav.Link>
            <Nav.Link className="white" href="/problems">Problems</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    <Routes>
      <Route path="/problems" element={<ProblemsScreen />} />
      <Route path="/problems/:problemId" element={<ProblemScreen />} />
      
    </Routes>
  </Router>)
}

export default App;
