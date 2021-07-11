import React from 'react';
import { useState } from 'react';
import { Card, Row, ListGroup, Col, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import axios from 'axios';

export default function Login() {
   const history = useHistory();
   const [formValues, setForm] = useState({ email: '', password: '' });

   const onsubmit = () => {
      console.log(formValues);
      axios
         .post('/login', formValues)
         .then((res) => {
            if (res.data.token) {
               localStorage.setItem('token', res.data.token);
               localStorage.setItem('email', res.data.email);
               localStorage.setItem('id', res.data.id);
               console.log(localStorage);
            }
            console.log(localStorage);
            history.push('/home');
         })
         .catch((err) => {
            console.log(err);
         });
   };

   return (
      <div
         className='container'
         style={{
            width: '40vw',
            margin: 'auto',
            marginTop: '5vh',
            textAlign: 'left',
         }}
      >
         <div className='wrapper'>
            <Row className='justify-content-md-center'>
               <Col>
                  <Card className=' text-center' bg={'light'}>
                     <Card.Body className='container'>
                        <Card.Header
                           style={{ fontSize: '25px', fontStyle: 'italic' }}
                        >
                           Please log in
                        </Card.Header>
                        <br />

                        <Form>
                           <Form.Group controlId='formBasicEmail'>
                              <Form.Label
                                 style={{
                                    fontSize: '17px',
                                    fontStyle: 'italic',
                                 }}
                              >
                                 Email address
                              </Form.Label>
                              <Form.Control
                                 name='email'
                                 type='text'
                                 className='email'
                                 placeholder='Enter email'
                                 onChange={(e) =>
                                    setForm({
                                       ...formValues,
                                       ['email']: e.target.value,
                                    })
                                 }
                              />
                           </Form.Group>
                           <br />
                           <Form.Group controlId='formBasicPassword'>
                              <Form.Label
                                 style={{
                                    fontSize: '17px',
                                    fontStyle: 'italic',
                                 }}
                              >
                                 Password
                              </Form.Label>
                              <Form.Control
                                 name='password'
                                 type='password'
                                 className='password'
                                 placeholder='Password'
                                 onChange={(e) =>
                                    setForm({
                                       ...formValues,
                                       ['password']: e.target.value,
                                    })
                                 }
                              />
                           </Form.Group>
                           <div className='button-placeholder'>
                              <Button variant='primary' onClick={onsubmit}>
                                 Log in
                              </Button>
                              <Button
                                 variant='primary'
                                 type='submit'
                                 onClick={() => history.push('/signup')}
                              >
                                 Sign up
                              </Button>
                           </div>
                        </Form>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>
         </div>
      </div>
   );
}
