<<<<<<< HEAD
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
=======
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  OverlayTrigger,
  Popover,
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col,
  Tooltip,
} from "react-bootstrap";
import { showToast } from "../Components/Constants/toastServices";
import search from "../Components/binoculars.png";
import connect from "../Components/global-connection.png";
import create from "../Components/study.png";
import logout from "../Components/logout.png";
import myaccount from "../Components/avatar.png";

export default function Navigation(props) {
  const { keyword, setKeyword } = props;
>>>>>>> 555b83e2fa05af5ca3579609717a589b02912ba7

  const signOff = () => {
    showToast(`Later ${localStorage.email}`, "success");
    localStorage.removeItem("token");
  };

<<<<<<< HEAD
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
=======
  const tooltipFindProj = ()=>{
    return (<Tooltip>Search for projects here</Tooltip>)
  }

  const tooltipMakeConnection = ()=>{
    return (<Tooltip>Search for Users here</Tooltip>)
  }

  const tooltipLeaderboard = ()=>{
    return (<Tooltip>See the Top Rated Users</Tooltip>)
  }

  const tooltipCreateProject = ()=>{
    return (<Tooltip>Have a Project? Start Here !</Tooltip>)
  }

  const tooltipMyAccount = ()=>{
    return (<Tooltip>Manage Your Account and Projects Here!</Tooltip>)
  }

  const tooltipLogout = ()=>{
    return (<Tooltip>Logout, See you soon!</Tooltip>)
  }

  return (
    <Router>
      <Navbar
        collapseOnSelect
        expand="lg"
        sticky="top"
        style={{ backgroundColor: "#242526" }}
        variant="dark"
      >
        <OverlayTrigger overlay={tooltipFindProj()} trigger="hover" placement="bottom">
        <Navbar.Brand href="/home">
        
        
          <span>Find projects{" "}
          <img
            src={search}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          /></span>
        </Navbar.Brand>
        </OverlayTrigger>
        <OverlayTrigger overlay={tooltipMakeConnection()} trigger="hover" placement="bottom">
        <Navbar.Brand href="/search_user">
          Make connection{" "}
          <img
            src={connect}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        </OverlayTrigger>
        <OverlayTrigger overlay={tooltipLeaderboard()} trigger="hover" placement="bottom">
        <Navbar.Brand href="/leaderBoard">LeaderBoard 🥇</Navbar.Brand>
        </OverlayTrigger>
        <OverlayTrigger overlay={tooltipCreateProject()} trigger="hover" placement="bottom">
        <Navbar.Brand className="ml-auto" href="/create_project">
          Create Project{" "}
          <img
            src={create}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        </OverlayTrigger>
        <OverlayTrigger overlay={tooltipMyAccount()} trigger="hover" placement="bottom">
        <Navbar.Brand href="/user_profile">
          My Account{" "}
          <img
            src={myaccount}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        </OverlayTrigger>
        <OverlayTrigger overlay={tooltipLogout()} trigger="hover" placement="bottom">
        <Nav>
          <Nav.Link href="/" onClick={signOff}>
            <img
              src={logout}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Nav.Link>
        </Nav>
        </OverlayTrigger>
      </Navbar>
    </Router>
  );
>>>>>>> 555b83e2fa05af5ca3579609717a589b02912ba7
}
