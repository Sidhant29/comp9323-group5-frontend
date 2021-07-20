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
import RatingConstant from '../Components/Constants/ratingConstant';
import SkillsBadge from '../Components/Constants/skillsBadge';
import bg from '../Components/network.jpg';

export default function Searchuser(props) {
   const { user } = props;
   const [skill, setSkill] = useState('');
   const [userType, setUserType] = useState(0);

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
      history.push(`/search_user/${userId}`);
   };
   return (
      <div
         className='Home-component'
         style={{
            backgroundImage: `url(${bg})`,
         }}
      >
         <Container fluid='md'>
            <Row className='justify-content-md-center'>
               <Col>
                  <div
                     style={{
                        margin: '5%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignSelf: 'center',
                     }}
                  >
                     <Card bg='dark'>
                        <Card.Body className='container'>
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
                           <ListGroup variant='flush'>
                              {userList ? (
                                 userList
                                    .filter((contact) => {
                                       return (
                                          contact.name
                                             .toString()
                                             .toLowerCase()
                                             .indexOf(
                                                user.toString().toLowerCase()
                                             ) > -1
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
                                                <Card.Header>
                                                   <div id='name-rating'>
                                                      <h5> {items.name}</h5>
                                                      <h4>
                                                         {' '}
                                                         <RatingConstant
                                                            rating={
                                                               items.rating
                                                            }
                                                         />
                                                      </h4>
                                                   </div>
                                                </Card.Header>
                                                <ListGroup variant='flush'>
                                                   <ListGroup.Item>
                                                      <h5>
                                                         {items.rating
                                                            ? `Ratings: ${items.rating}`
                                                            : ' No ratings yet'}
                                                      </h5>
                                                   </ListGroup.Item>
                                                   <ListGroup.Item>
                                                      {changeSkills && (
                                                         <h5>
                                                            Skills
                                                            <SkillsBadge
                                                               skills={
                                                                  items.acquiredSkills
                                                               }
                                                               type='success'
                                                            />
                                                         </h5>
                                                      )}
                                                      {!changeSkills && (
                                                         <h5>
                                                            Learning
                                                            {
                                                               items.learningSkills
                                                            }
                                                            <SkillsBadge
                                                               skills={
                                                                  items.learningSkills
                                                               }
                                                               type='warning'
                                                            />
                                                         </h5>
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
                  </div>
               </Col>
            </Row>
         </Container>
      </div>
   );
}
