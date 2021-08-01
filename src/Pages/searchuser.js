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
   CardDeck,
   CardGroup,
} from 'react-bootstrap';
import axios from 'axios';
import { urls } from '../Components/Constants/url';
import RatingConstant from '../Components/Constants/ratingConstant';
import SkillsBadge from '../Components/Constants/skillsBadge';
import GetSearchedUser from './getSearchedUser';

export default function Searchuser(props) {
   const { user } = props;
   const [selectedUser, setSelectedUser] = useState('');
   const [skill, setSkill] = useState('');
   const [userType, setUserType] = useState(0);
   const [modalShow, setModalShow] = React.useState(false);

   const history = useHistory();
   const [userList, setuserList] = useState(0);
   const [changeSkills, setChangeSkills] = useState(true);
   const [rating, setRating] = useState(0);

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
      setModalShow(true);
      setSelectedUser(userId);
      console.log(userId);

      // history.push(`/search_user/${userId}`);
   };

   return (
      <Card bg='dark' style={{ width: '100%' }}>
         <Card.Header>
            <Card.Title>
               <h1 style={{ color: '#ffc107' }}>Search user</h1>
            </Card.Title>
         </Card.Header>
         <Card.Body>
            <Card.Header>
               <InputGroup className='mb-3'>
                  <FormControl
                     id='search-skills'
                     aria-describedby='basic-addon3'
                     placeholder='search by skill'
                     onChange={(e) => setSkill(e.target.value)}
                  />
               </InputGroup>
               <ListGroup.Item>
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
               </ListGroup.Item>
            </Card.Header>
            {/* <ListGroup variant="flush"> */}
            <Row id='row'>
               {userList ? (
                  userList
                     .filter((contact) => {
                        return (
                           contact.name
                              .toString()
                              .toLowerCase()
                              .indexOf(user.toString().toLowerCase()) > -1
                        );
                     })
                     .map((items) => {
                        return (
                           <Col xs={12} md={6} lg={4} id='col-md-4-user'>
                              <Card
                                 id='user-search'
                                 border='dark'
                                 key={items.id}
                                 onClick={() => handleRouting(items.id)}
                              >
                                 <Card.Body>
                                    <Card.Title>
                                       {' '}
                                       {items.name}{' '}
                                       <RatingConstant rating={items.rating} />
                                    </Card.Title>

                                    <Card.Title>
                                       {items.rating
                                          ? `Ratings: ${items.rating}`
                                          : ' No ratings yet'}
                                    </Card.Title>

                                    {changeSkills && (
                                       <Card.Text>
                                          Skills
                                          <SkillsBadge
                                             skills={items.acquiredSkills}
                                             type='success'
                                          />
                                       </Card.Text>
                                    )}
                                    {!changeSkills && (
                                       <Card.Text>
                                          Learning
                                          {items.learningSkills}
                                          <SkillsBadge
                                             skills={items.learningSkills}
                                             type='warning'
                                          />
                                       </Card.Text>
                                    )}
                                 </Card.Body>
                              </Card>
                              <br />
                           </Col>
                        );
                     })
               ) : (
                  <h3>no results</h3>
               )}
            </Row>
            {modalShow && (
               <GetSearchedUser
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  userId={selectedUser}
               />
            )}
         </Card.Body>
      </Card>
   );
}
