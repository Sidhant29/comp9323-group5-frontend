import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

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
import Ratings from '../Components/Constants/ratings';
import { showToast } from '../Components/Constants/toastServices';

export default function GetSearchedUser(props) {
   const { userId } = useParams();
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
         .post(`/email/${localStorage.userId}`, emailPayload, {
            headers: {
               Accept: 'application/json',
               Authorization: localStorage.token,
            },
         })
         .then((res) => {
            if (res.data === 'Email sent successfully') {
               setMsgBox(false);
               setFlipButton('Request sent');
               showToast(`Request sent 📬`, 'success');
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

   const renderDetails = () => {
      console.log('$$$');
      axios
         .get('/user' + `/${userId}`, {
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
   };

   useEffect(() => {
      renderDetails();
   }, []);

   return (
      <Container fluid='md'>
         <Row className='justify-content-md-center'>
            <Col>
               <div
                  style={{
                     margin: '5%',
                     width: '30rem',
                     alignSelf: 'center',
                  }}
               >
                  <Card id='user-details' bg='dark'>
                     <Card.Body className='container'>
                        <Card.Header id='user-details-header'>
                           <h3>
                              {userDetails.firstName} {userDetails.lastName}
                           </h3>
                           <Card.Text>
                              <p>{userDetails.bio}</p>
                           </Card.Text>
                        </Card.Header>

                        <ListGroup.Item>
                           <h2>
                              {userDetails.rating
                                 ? `Rating: ${userDetails.rating}`
                                 : ' No ratings yet'}
                           </h2>
                           <h3 onClick={renderDetails}>
                              <Ratings userId={userId} />
                           </h3>
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
                           <ListGroup.Item className=' text-center'>
                              {!msgBox && (
                                 <Button
                                    variant='warning'
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
                                    <Button
                                       variant='warning'
                                       onClick={() => sendEmail()}
                                    >
                                       Send connection request
                                    </Button>
                                    {'    '}
                                    <Button
                                       variant='danger'
                                       onClick={() => setMsgBox(false)}
                                    >
                                       close
                                    </Button>
                                 </div>
                              )}
                           </ListGroup.Item>
                        </ListGroup>
                     </Card.Body>
                  </Card>
               </div>
            </Col>
         </Row>
      </Container>
   );
}
