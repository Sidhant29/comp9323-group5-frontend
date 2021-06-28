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
} from 'react-bootstrap';

export default function Navigation() {
   return (
      <>
         <Router>
            <Navbar bg='dark' variant='dark'>
               <Navbar.Brand>Learning-Projects-Portal</Navbar.Brand>
               <Nav className='mr-auto'>
                  <Nav.Item>
                     <Nav.Link href='/home' style={{ textalign: 'right' }}>
                        Home
                     </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                     <Nav.Link href='/login'>Login</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                     <Nav.Link href='/signup'>SignUp</Nav.Link>
                  </Nav.Item>
               </Nav>
               <Form inline>
                  <FormControl
                     type='text'
                     placeholder='Search'
                     className='mr-sm-2'
                  />
                  <Button variant='outline-info'>Search</Button>
               </Form>
            </Navbar>
         </Router>
      </>
   );
}
