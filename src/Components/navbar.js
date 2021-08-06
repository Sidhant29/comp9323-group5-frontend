import React from 'react';
import { useState, useEffect } from 'react';
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
import search from '../Components/binoculars.png';
import connect from '../Components/global-connection.png';
import create from '../Components/study.png';
import logout from '../Components/logout.png';
import myaccount from '../Components/avatar.png';
import request from '../Components/request.png';
import Notifications from './myRequests';

export default function Navigation(props) {
   const { keyword, setKeyword } = props;
   const [modalShow, setModalShow] = useState(false);

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
               <Navbar.Brand href='/home'>
                  Find projects{' '}
                  <img
                     src={search}
                     width='30'
                     height='30'
                     className='d-inline-block align-top'
                     alt='React Bootstrap logo'
                  />
               </Navbar.Brand>
               <Navbar.Brand href='/search_user'>
                  Make connection{' '}
                  <img
                     src={connect}
                     width='30'
                     height='30'
                     className='d-inline-block align-top'
                     alt='React Bootstrap logo'
                  />
               </Navbar.Brand>
               <Navbar.Toggle aria-controls='responsive-navbar-nav' />
               <Navbar.Brand href='/create_project'>
                  Create
                  <img
                     src={create}
                     width='30'
                     height='30'
                     className='d-inline-block align-top'
                     alt='React Bootstrap logo'
                  />
                  project
               </Navbar.Brand>
               <Navbar.Brand href='/leaderBoard'>🥇</Navbar.Brand>
               <Navbar.Brand href='/user_profile'>
                  {' '}
                  <img
                     src={myaccount}
                     width='30'
                     height='30'
                     className='d-inline-block align-top'
                     alt='React Bootstrap logo'
                  />
               </Navbar.Brand>
               <Nav>
                  <Nav.Link onClick={() => setModalShow(true)}>
                     <img
                        src={request}
                        width='30'
                        height='30'
                        className='d-inline-block align-top'
                        alt='React Bootstrap logo'
                     />
                     <Notifications
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                     />
                  </Nav.Link>
               </Nav>
               <Nav>
                  <Nav.Link href='/' onClick={signOff}>
                     <img
                        src={logout}
                        width='30'
                        height='30'
                        className='d-inline-block align-top'
                        alt='React Bootstrap logo'
                     />
                  </Nav.Link>
               </Nav>
            </Container>
         </Navbar>
      </Router>
   );
}
