import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

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
import bg from '../Components/projects.jpg';

export default function ProjectPage() {
   const { projectId } = useParams();
   const history = useHistory();

   const [msgBox, setMsgBox] = useState(false);
   const [projects, setProjects] = useState([]);
   const [emailPayload, setEmailPayload] = useState({
      projectId: parseInt(projectId),
      emailBody: '',
      lookingFor: 1,
   });
   const [flipButton, setFlipButton] = useState('Connect');
   const [aquiredSkills, setAquiredSkills] = useState(['']);

   const sendEmail = () => {
      console.log(emailPayload);
      setMsgBox(false);
      setFlipButton('Sending request >>>');
      axios
         .post(`/email/project/${localStorage.userId}`, emailPayload, {
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

   const handleRouting = (userId) => {
      history.push(`/search_user/${userId}`);
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
            setAquiredSkills(res.data.skills.split(','));
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

   return (
      <Card
         bg='dark'
         style={{
            height: '150vh',
            width: '100%',
         }}
      >
         <Card.Body className='container'>
            <Card.Header id='user-details-header'>
               <h3>{projects.title}</h3>
            </Card.Header>
            <ListGroup.Item>
               <Card.Text>{projects.description}</Card.Text>
            </ListGroup.Item>
            <ListGroup.Item>
               <Card.Text>
                  <h3>Skills required</h3>

                  {aquiredSkills
                     .filter((element) => element !== '')
                     .map((element) => {
                        return (
                           <Button
                              variant='success'
                              style={{
                                 margin: '0.25rem',
                                 pointerEvents: 'none',
                              }}
                           >
                              {element}{' '}
                           </Button>
                        );
                     })}
               </Card.Text>
            </ListGroup.Item>
            <ListGroup.Item>
               <Card.Text>
                  <h3>Looking for</h3>

                  <Button
                     style={{
                        margin: '0.1rem',
                        pointerEvents: 'none',
                     }}
                     variant='danger'
                  >
                     <LookingFor participants={projects.participants} />{' '}
                  </Button>
               </Card.Text>
            </ListGroup.Item>
            <ListGroup.Item>
               <Card.Text>
                  <h3>Posted by</h3>

                  <h4>
                     <Button
                        variant='primary'
                        style={{
                           margin: '0.25rem',
                        }}
                        onClick={() => handleRouting(projects.user_id)}
                     >
                        {projects.user_name}
                     </Button>
                  </h4>
               </Card.Text>
            </ListGroup.Item>
            <ListGroup.Item>
               <h3>Posted on</h3>
               <h3>
                  <small className='text-muted'>{projects.created_date}</small>
               </h3>
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
                        <InputGroup.Text id='basic-addon3'>
                           Tell us a little about yourself
                        </InputGroup.Text>{' '}
                        <FormControl
                           as='textarea'
                           rows={6}
                           id='email-body'
                           aria-describedby='basic-addon3'
                           onChange={(e) =>
                              setEmailPayload({
                                 ...emailPayload,
                                 ['emailBody']: e.target.value,
                              })
                           }
                        />
                        <br />
                        <form>
                           <div>
                              <InputGroup.Text id='basic-addon3'>
                                 Tell us what are you applying for
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
                        <br />
                        <Button variant='warning' onClick={() => sendEmail()}>
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
   );
}
