import React from 'react';
import { useState, useEffect } from 'react';
import {
   Card,
   Row,
   Container,
   Col,
   ListGroup,
   Button,
   InputGroup,
   Form,
   FormControl,
} from 'react-bootstrap';
import axios from 'axios';

export default function GetSearchedUser(props) {
   const { selectedUser } = props;
   const [userDetails, setUserDetails] = useState([]);
   const [msgBox, setMsgBox] = useState(false);
   const [emailPayload, setEmailPayload] = useState({
      receiverId: '',
      emailBody: '',
      lookingFor: 1,
   });
   const [flipButton, setFlipButton] = useState('Connect');
   const sendEmail = () => {
      console.log(localStorage);
      console.log(emailPayload);
      setMsgBox(false);
      setFlipButton('Sending request >>>');
      axios
         .post(`/email/${localStorage.id}`, emailPayload, {
            headers: {
               Accept: 'application/json',
               Authorization: localStorage.token,
            },
         })
         .then((res) => {
            if (res.data === 'Email sent successfully') {
               setMsgBox(false);
               setFlipButton('Request sent');
            }
            console.log(res.data);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const handleChange = (event) => {
      const value = event.target.value;
      console.log(value);
      if (value === '1') {
         setEmailPayload({
            ...emailPayload,
            ['lookingFor']: 1,
         });
      } else if (value === '2') {
         setEmailPayload({
            ...emailPayload,
            ['lookingFor']: 2,
         });
      }
      console.log(value);
   };

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
            setEmailPayload({
               ...emailPayload,
               ['receiverId']: res.data.id,
            });
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
                        <h2>
                           {userDetails.rating
                              ? `Rating :${userDetails.rating}`
                              : ' No ratings yet'}
                        </h2>
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
                           {!msgBox && (
                              <Button
                                 onClick={() => {
                                    setMsgBox(true);
                                 }}
                              >
                                 {flipButton}
                              </Button>
                           )}

                           {msgBox && (
                              <div>
                                 <InputGroup className='mb-3'>
                                    <InputGroup.Text id='basic-addon3'>
                                       Message
                                    </InputGroup.Text>
                                    <FormControl
                                       id='email-body'
                                       aria-describedby='basic-addon3'
                                       onChange={(e) =>
                                          setEmailPayload({
                                             ...emailPayload,
                                             ['emailBody']: e.target.value,
                                          })
                                       }
                                    />
                                 </InputGroup>
                                 <form>
                                    <div>
                                       <InputGroup.Text id='basic-addon3'>
                                          Looking for
                                       </InputGroup.Text>
                                       <Form.Check
                                          inline
                                          label='mentor'
                                          name='userType'
                                          type='radio'
                                          value='1'
                                          onChange={handleChange}
                                       />
                                       <Form.Check
                                          inline
                                          label='mentee'
                                          name='userType'
                                          type='radio'
                                          value='2'
                                          onChange={handleChange}
                                       />
                                    </div>
                                 </form>
                                 <Button onClick={() => sendEmail()}>
                                    Send connection request
                                 </Button>
                              </div>
                           )}
                        </ListGroup.Item>
                     </ListGroup>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </Container>
   );
}
