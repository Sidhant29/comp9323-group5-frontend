import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import {
   Card,
   Row,
   Container,
   Col,
   ListGroup,
   FormControl,
   InputGroup,
   Form,
   Dropdown,
} from 'react-bootstrap';
import axios from 'axios';
import { urls } from '../Components/Constants/url';

export default function Searchuser(props) {
   const { user } = props;
   const [skill, setSkill] = useState('');
   const [userType, setUserType] = useState(0);

   const history = useHistory();
   const [userList, setuserList] = useState(0);
   const [changeSkills, setChangeSkills] = useState(true);

   const handleChange = (event) => {
      const value = event.target.value;
      console.log(value);
      if (value === '1') {
         setChangeSkills(true);

         setUserType(1);
      } else if (value === '2') {
         setChangeSkills(false);
         setUserType(2);
      }
      console.log(value);
   };

   useEffect(() => {
      axios
         .get(
            urls.searchUser +
               `?name=${user}&skill=${skill}&userType=${userType}`
         )
         .then((res) => {
            if (res.data !== 'NO RECORDS FOUND') {
               setuserList(res.data);
            } else {
               setuserList(0);
            }
         })
         .catch((err) => {
            console.log(err);
         });
   }, [user, skill, userType]);

   const handleRouting = (userId) => {
      history.push(`/search_user/${userId}`);
   };
   return (
      <Container fluid='md'>
         <Row className='justify-content-md-center'>
            <Col>
               <Card className=' text-center' bg='success'>
                  <Card.Body className='container'>
                     <Card.Header>
                        <Dropdown>
                           <Dropdown.Toggle
                              variant='warning'
                              id='dropdown-basic'
                           >
                              Filters
                           </Dropdown.Toggle>

                           <Dropdown.Menu>
                              <InputGroup className='mb-3'>
                                 <InputGroup.Text id='basic-addon3'>
                                    search by skill
                                 </InputGroup.Text>
                                 <FormControl
                                    id='search-skills'
                                    aria-describedby='basic-addon3'
                                    placeholder='python'
                                    onChange={(e) => setSkill(e.target.value)}
                                 />
                              </InputGroup>
                              <form>
                                 <div>
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
                           </Dropdown.Menu>
                        </Dropdown>
                     </Card.Header>
                     <ListGroup variant='flush'>
                        {userList ? (
                           userList
                              .filter((contact) => {
                                 return (
                                    contact.name
                                       .toString()
                                       .toLowerCase()
                                       .indexOf(user.toString().toLowerCase()) >
                                    -1
                                 );
                              })
                              .map((items) => {
                                 return (
                                    <div
                                       style={{
                                          width: '30rem',
                                          textAlign: 'centre',
                                          alignSelf: 'center',
                                       }}
                                    >
                                       <br />
                                       <Card
                                          id='user-search'
                                          border='dark'
                                          key={items.id}
                                          onClick={() =>
                                             handleRouting(items.id)
                                          }
                                       >
                                          <Card.Header id='user-search-header'>
                                             <h5> {items.name}</h5>
                                          </Card.Header>
                                          <ListGroup variant='flush'>
                                             <ListGroup.Item>
                                                {' '}
                                                {items.rating
                                                   ? `Ratings: ${items.rating}`
                                                   : ' No ratings yet'}
                                             </ListGroup.Item>
                                             <ListGroup.Item>
                                                {changeSkills && (
                                                   <p>
                                                      Skills:{' '}
                                                      {items.acquiredSkills}
                                                   </p>
                                                )}
                                                {!changeSkills && (
                                                   <p>
                                                      Learning:{' '}
                                                      {items.learningSkills}
                                                   </p>
                                                )}
                                             </ListGroup.Item>
                                          </ListGroup>
                                       </Card>
                                    </div>
                                 );
                              })
                        ) : (
                           <h3>no results</h3>
                        )}
                     </ListGroup>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </Container>
   );
}
