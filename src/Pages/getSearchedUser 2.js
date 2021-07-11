import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Row, Container, Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { urls } from '../Components/Constants/url';

export default function GetSearchedUser(props) {
   const { selectedUser } = props;
   const [userDetails, setUserDetails] = useState([]);

   useEffect(() => {
      console.log(localStorage.token);
      axios
         .get('/user' + `/${selectedUser}`, {
            headers: {
               Accept: 'application/json',
               Authorization: localStorage.token,
            },
         })
         .then((res) => {
            setUserDetails(res.data);
            console.log(res.data);
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

   return (
      <Container fluid='md'>
         <Row className='justify-content-md-center'>
            <Col>
               <Card className=' text-center' bg={'light'}>
                  <Card.Body className='container'>
                     <Card.Header>
                        <h3>
                           {userDetails.firstName} {userDetails.lastName}
                        </h3>
                        <h2>Rating: {userDetails.rating}</h2>
                     </Card.Header>
                     <ListGroup.Item>
                        <h5>Bio</h5>
                        <p>{userDetails.bio}</p>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <h5>Skilled at</h5>
                        <p>{userDetails.acquiredSkills}</p>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <h5>Love to learn</h5>
                        <p>{userDetails.learningSkills}</p>
                     </ListGroup.Item>
                     <ListGroup variant='flush'>
                        <ListGroup.Item>
                           <h5>Send a connection request</h5>
                           <a href={'mailto:' + userDetails.email}>
                              {userDetails.email}
                           </a>
                        </ListGroup.Item>
                     </ListGroup>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </Container>
   );
}
