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
      <div
         className='Login-component'
         style={{
            backgroundImage: `url(${bg})`,
         }}
      >
         <Container fluid='md'>
            <Row className='justify-content-md-center'>
               <Col>
                  <div
                     style={{
                        margin: '1%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignSelf: 'center',
                     }}
                  >
                     <Card bg='dark'>
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
                                    <LookingFor
                                       participants={projects.participants}
                                    />{' '}
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
                                       onClick={() =>
                                          handleRouting(projects.user_id)
                                       }
                                    >
                                       {projects.user_name}
                                    </Button>
                                 </h4>
                              </Card.Text>
                           </ListGroup.Item>
                           <ListGroup.Item>
                              <h3>Posted on</h3>
                              <h3>
                                 <small className='text-muted'>
                                    {projects.created_date}
                                 </small>
                              </h3>
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
      </div>
   );
}
