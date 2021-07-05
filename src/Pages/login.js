import React from 'react';
import { Card, Row, ListGroup, Col, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';

export default function Login() {
   const history = useHistory();
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
                                 type='email'
                                 placeholder='Enter email'
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
                                 type='password'
                                 placeholder='Password'
                              />
                           </Form.Group>
                           <div className='button-placeholder'>
                              <Button variant='primary' type='submit'>
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
