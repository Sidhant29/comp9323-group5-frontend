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
   const { user, ifClicked } = props;
   const [skill, setSkill] = useState('');
   const [userType, setUserType] = useState(0);

   const history = useHistory();
   const [userList, setuserList] = useState(0);

   const handleChange = (event) => {
      const value = event.target.value;
      console.log(value);
      if (value === '1') {
         setUserType(1);
      } else if (value === '2') {
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
      ifClicked(userId);
      history.push(`/search_user/user`);
   };
   return (
      <Container fluid='md'>
         <Row className='justify-content-md-center'>
            <Col>
               <Card className=' text-center' bg={'light'}>
                  <Card.Body className='container'>
                     <Card.Header>
                        <Dropdown>
                           <Dropdown.Toggle
                              variant='success'
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
                                    <ListGroup.Item
                                       id='bootstrap-overrides'
                                       key={items.id}
                                       onClick={() => handleRouting(items.id)}
                                    >
                                       <h3 className='name'>{items.name}</h3>
                                       <h3 className='name'>
                                          Ratings:
                                          {items.rating
                                             ? items.rating
                                             : ' No ratings yet'}
                                       </h3>
                                    </ListGroup.Item>
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
