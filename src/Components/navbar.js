import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css";
import {
   Nav,
   Navbar,
   NavDropdown,
   Form,
   FormControl,
   Button,
   Container,
} from 'react-bootstrap';

export default function Navigation() {
   return (
      <>
         <Router>
            <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
               <Container>
                  <Navbar.Brand href='/home'>
                     Learning-Projects-Portal
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                  <Navbar.Collapse id='responsive-navbar-nav'>
                     <Nav className='me-auto'>
                        <Nav.Link href='/login'>Login</Nav.Link>
                        <Nav.Link href='/signup'>Signup</Nav.Link>
                        <Form className='d-flex'>
                           <FormControl
                              type='text'
                              placeholder='Search'
                              className='mr-sm-2'
                           />
                           <Button variant='outline-info'>Search</Button>
                        </Form>
                     </Nav>
                     <Nav>
                        <Nav.Link href='/my_account'>My account</Nav.Link>
                     </Nav>
                  </Navbar.Collapse>
               </Container>
            </Navbar>
         </Router>
      </>
   );
}
