import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
   Nav,
   Navbar,
   Form,
   FormControl,
   Button,
   Container,
} from 'react-bootstrap';
import { showToast } from '../Components/Constants/toastServices';

export default function Navigation(props) {
   const { keyword, setKeyword } = props;

   const signOff = () => {
      showToast(`Later ${localStorage.email}`, 'success');
      localStorage.removeItem('token');
   };

   return (
      <Router>
         <Navbar
            collapseOnSelect
            expand='lg'
            style={{ backgroundColor: 'black' }}
            variant='dark'
         >
            <Container style={{ display: 'flex' }}>
               <Navbar.Brand href='/home'>Find projects</Navbar.Brand>
               <Navbar.Brand href='/search_user'>Search user</Navbar.Brand>
               <Navbar.Toggle aria-controls='responsive-navbar-nav' />
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
               <Navbar.Brand href='/leaderBoard'>🥇</Navbar.Brand>
               <Navbar.Brand href='/create_project'>
                  Create project
               </Navbar.Brand>
               <Navbar.Brand href='/user_profile'>My account</Navbar.Brand>
               <Nav>
                  <Nav.Link href='/' onClick={signOff}>
                     Logout
                  </Nav.Link>
               </Nav>
            </Container>
         </Navbar>
      </Router>
   );
}
