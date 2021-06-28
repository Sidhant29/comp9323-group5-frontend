import React, { useState } from 'react';
import { Form, Button, Card, Badge } from 'react-bootstrap';

export default function CreateProject() {
   const [skillsRequired, setSkillsRequired] = useState([]);
   return (
      <Card className='translucent'>
         <Card.Body>
            <Form>
               <Form.Group controlId='formTitle'>
                  <Form.Label>Project Title</Form.Label>
                  <Form.Control type='text' placeholder='Project Title' />
               </Form.Group>
               <Form.Group className='mb-3' controlId='formDesc'>
                  <Form.Label>Project Description</Form.Label>
                  <Form.Control
                     as='textarea'
                     rows={3}
                     placeholder='Tell us about your project'
                  />
               </Form.Group>
               <Form.Group controlId='formVideo'>
                  <Form.Label>Project Video</Form.Label>
                  <Form.Control
                     type='url'
                     placeholder='URL of your project video'
                  />
               </Form.Group>
               <Form.Group controlId='formParticipants'>
                  <Form.Label>Seeking</Form.Label>
                  {['checkbox'].map((type) => (
                     <div key={`inline-${type}`} className='mb-3'>
                        <Form.Check
                           inline
                           label='Mentor'
                           name='Mentor'
                           type={type}
                           id={`inline-${type}-1`}
                        />
                        <Form.Check
                           inline
                           label='Mentee'
                           name='Mentee'
                           type={type}
                           id={`inline-${type}-2`}
                        />
                        <Form.Check
                           inline
                           label='Mentor & Mentee'
                           name='mentor-mentee'
                           type={type}
                           id={`inline-${type}-3`}
                        />
                     </div>
                  ))}
               </Form.Group>
               <Form>
                  <Form.Group controlId='formSkillsrequired'>
                     <Form.Label>
                        Skills required to complete the project
                     </Form.Label>
                     <Form.Control type='text' placeholder='Data Analysis' />
                     <br />
                     {skillsRequired.map((element) => {
                        return (
                           <Button
                              onClick={(event) => {
                                 let newArray = [...skillsRequired].filter(
                                    (item) =>
                                       item + ` x` !== event.target.innerText
                                 );
                                 setSkillsRequired(newArray);
                              }}
                           >
                              {element} x
                           </Button>
                        );
                     })}
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
               <Button variant='success'>Submit</Button>
            </Form>
         </Card.Body>
      </Card>
   );
}
