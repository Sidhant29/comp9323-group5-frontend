import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Badge } from 'react-bootstrap';

export default function CreateProject() {
   const [skillsRequired, setSkillsRequired] = useState([]);

   const [projectDetails, setProjectDetails] = useState({
      title: '',
      description: '',
      skills: '',
      user_id: Number(localStorage.userId),
      participants: 0,
      url: '',
   });

   async function handleSubmit() {
      if (!(Array.isArray(skillsRequired) && skillsRequired.length)) {
         alert('Skills cannot be empty');
         return null;
      }
      console.log({ ...projectDetails, skills: skillsRequired.join() });
      axios
         .post(`/createProject`, projectDetails, {
            headers: {
               Authorization: localStorage.token,
            },
         })
         .then((response) => {
            alert('Project Successfully Created');
         })
         .catch((error) => {
            console.log(error);
         });
   }

   return (
      <Card
         bg='dark'
         style={{ width: '100%', height: '100vh' }}
         className='translucent'
      >
         <Card.Header>
            <h1 style={{ color: '#ffc107' }}>Create new Projects</h1>
         </Card.Header>

         <Card.Body>
            <Form>
               <Form.Group controlId='formTitle'>
                  <Form.Label style={{ color: 'white' }}>
                     Project Title
                  </Form.Label>
                  <Form.Control
                     type='text'
                     placeholder='Project Title'
                     onChange={(e) =>
                        setProjectDetails({
                           ...projectDetails,
                           title: e.target.value,
                        })
                     }
                  />
               </Form.Group>
               <Form.Group className='mb-3' controlId='formDesc'>
                  <Form.Label style={{ color: 'white' }}>
                     Project Description
                  </Form.Label>
                  <Form.Control
                     as='textarea'
                     rows={3}
                     onChange={(e) =>
                        setProjectDetails({
                           ...projectDetails,
                           description: e.target.value,
                        })
                     }
                     placeholder='Tell us about your project'
                  />
               </Form.Group>
               <Form.Group controlId='formVideo'>
                  <Form.Label style={{ color: 'white' }}>
                     Project Video
                  </Form.Label>
                  <Form.Control
                     type='url'
                     placeholder='URL of your project video'
                     onChange={(e) =>
                        setProjectDetails({
                           ...projectDetails,
                           url: e.target.value,
                        })
                     }
                  />
               </Form.Group>
               <Form.Group controlId='formParticipants'>
                  <Form.Label style={{ color: 'white' }}>Seeking</Form.Label>

                  <div key={`inline-radio`} className='mb-3'>
                     <Form.Check
                        style={{ color: 'white' }}
                        inline
                        label='Mentor'
                        name='participant'
                        type='radio'
                        onClick={() =>
                           setProjectDetails({
                              ...projectDetails,
                              participants: 1,
                           })
                        }
                        id={`inline-radio-1`}
                     />
                     <Form.Check
                        style={{ color: 'white' }}
                        inline
                        label='Mentee'
                        name='participant'
                        type='radio'
                        onClick={() =>
                           setProjectDetails({
                              ...projectDetails,
                              participants: 2,
                           })
                        }
                        id={`inline-radio-2`}
                     />
                     <Form.Check
                        style={{ color: 'white' }}
                        inline
                        label='Mentor & Mentee'
                        name='participant'
                        type='radio'
                        onClick={() =>
                           setProjectDetails({
                              ...projectDetails,
                              participants: 3,
                           })
                        }
                        id={`inline-radio-3`}
                     />
                  </div>
               </Form.Group>
               <Form>
                  <Form.Group controlId='formSkillsrequired'>
                     <Form.Label style={{ color: 'white' }}>
                        Skills required to complete the project
                     </Form.Label>
                     <Form.Control type='text' placeholder='Data Analysis' />
                     <br />
                     {skillsRequired
                        .filter((element) => element !== '')
                        .map((element) => {
                           return (
                              <Button
                                 variant='primary'
                                 style={{ margin: '0.25rem' }}
                              >
                                 {element}{' '}
                                 <Badge
                                    onClick={(event) => {
                                       let newArray = [
                                          ...skillsRequired,
                                       ].filter((item) => item !== element);
                                       setSkillsRequired(newArray);
                                    }}
                                    variant='light'
                                 >
                                    x
                                 </Badge>
                              </Button>
                           );
                        })}
                     <br />
                     <Button
                        onClick={() => {
                           if (
                              document.getElementById('formSkillsrequired')
                                 .value !== ''
                           ) {
                              setSkillsRequired([
                                 ...skillsRequired,
                                 document.getElementById('formSkillsrequired')
                                    .value,
                              ]);
                           }
                        }}
                        variant='secondary'
                        type='reset'
                     >
                        Add skill
                     </Button>
                  </Form.Group>
               </Form>
               <br />
               <Button variant='success' onClick={handleSubmit}>
                  Submit
               </Button>
            </Form>
         </Card.Body>
      </Card>
   );
}
