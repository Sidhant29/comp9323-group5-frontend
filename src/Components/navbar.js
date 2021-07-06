import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css";
import {
   Nav,
   Navbar,
   Form,
   FormControl,
   Button,
   Container,
} from 'react-bootstrap';

export default function Navigation(props) {
   const { keyword, setKeyword } = props;

   return (
      <>
         <Router>
            <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
               <Container>
                  <Navbar.Brand href='/home'>Find projects</Navbar.Brand>
                  <Navbar.Brand href='/home'>Look-up</Navbar.Brand>
                  <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                  <Navbar.Collapse id='responsive-navbar-nav'>
                     <Nav className='me-auto'>
                        <Form className='d-flex'>
                           <FormControl
                              type='text'
                              placeholder='Search'
                              value={keyword}
                              onChange={(e) => setKeyword(e.target.value)}
                              className='mr-sm-2'
                           />
                           <Button variant='outline-info'>Search</Button>
                        </Form>
                     </Nav>
                     <Nav>
                        <Nav.Link href='/create_project'>
                           Create project
                        </Nav.Link>
                     </Nav>
                     <Nav>
                        <Nav.Link href='/user_profile'>My account</Nav.Link>
                     </Nav>
                     <Nav>
                        <Nav.Link href='/'>Logout</Nav.Link>
                     </Nav>
                  </Navbar.Collapse>
               </Container>
            </Navbar>
         </Router>
      </>
   );
}
