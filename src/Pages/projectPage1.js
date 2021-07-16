import React, { useState, useEffect } from 'react';
import {
   Card,
   Col,
   Row,
   Container,
   Form,
   FormControl,
   InputGroup,
   Badge,
   Button,
   ListGroup,
} from 'react-bootstrap';
import { useParams } from 'react-router';
import axios from 'axios';
import LookingFor from '../Components/Constants/lookingFor';
import { showToast } from '../Components/Constants/toastServices';

export default function ProjectPage() {
   const { projectId } = useParams();
   const [msgBox, setMsgBox] = useState(false);
   const [projects, setProjects] = useState([]);
   const [emailPayload, setEmailPayload] = useState({
      projectId: parseInt(projectId),
      emailBody: '',
      lookingFor: 1,
   });
   const [flipButton, setFlipButton] = useState('Connect');

   const sendEmail = () => {
      console.log(emailPayload);
      setMsgBox(false);
      setFlipButton('Sending request >>>');
      axios
         .post(`/email/${projectId}`, emailPayload, {
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

   useEffect(() => {
      console.log(localStorage.token);
      axios
         .get('/project' + `/${projectId}`, {
            headers: {
               Accept: 'application/json',
               Authorization: localStorage.token,
            },
         })
         .then((res) => {
            setProjects(res.data);
            //   setEmailPayload({
            //      ...emailPayload,
            //      ['projectId']: res.data.id,
            //   });
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
               <div
                  style={{
                     margin: '5%',
                     width: '30rem',
                     alignSelf: 'center',
                  }}
               >
                  <Card bg='dark'>
                     <Card.Body className='container'>
                        <Card.Header id='user-details-header'>
                           {projects.title}
                        </Card.Header>
                        <ListGroup.Item>
                           <Card.Text>{projects.description}</Card.Text>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Card.Text>
                              skills required
                              <br />
                              <Badge
                                 style={{ margin: '0.1rem' }}
                                 variant='primary'
                              >
                                 {projects.skills}
                              </Badge>
                           </Card.Text>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Card.Text>
                              Looking for
                              <br />
                              <Badge
                                 style={{ margin: '0.1rem' }}
                                 variant='warning'
                              >
                                 <LookingFor
                                    participants={projects.participants}
                                 />{' '}
                              </Badge>
                           </Card.Text>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Card.Text>
                              Posted by
                              <br />
                              <h4>{projects.user_name}</h4>
                           </Card.Text>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           Posted in
                           <br />
                           <small className='text-muted'>
                              {projects.created_date}
                           </small>
                        </ListGroup.Item>
                     </Card.Body>
                     <Card.Footer>
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
                                       Applying for
                                    </InputGroup.Text>
                                    <ListGroup.Item>
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
                                    </ListGroup.Item>
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
                     </Card.Footer>
                  </Card>
               </div>
            </Col>
         </Row>
      </Container>
   );
}
