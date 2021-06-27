import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

export default function Navigation() {
  return (
    <>
      <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Learning-Projects-Portal</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link style={{ textalign: "right" }}>
              <Link to="/home">Home</Link>
            </Nav.Link>
          </Nav>
          <Form inline>
            <Nav.Link>
              <Link to="/login">Login</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/signup">SignUp</Link>
            </Nav.Link>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
      </Router>
    </>
  );
}
