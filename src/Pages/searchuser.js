import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Card, Row, Container, Col, ListGroup, Image } from 'react-bootstrap';
import axios from 'axios';
import { urls } from '../Components/Constants/url';

export default function Searchuser(props) {
   const { user, ifClicked } = props;
   const [skill, setSkill] = useState('');
   const [userType, setUserType] = useState('');

   const history = useHistory();
   const [userList, setuserList] = useState([]);

   // useEffect(() => {
   //    SearchUser(skill, user, userType).then((data) => {
   //       console.log(data);

   //       setuserList(data);
   //       console.log(userList);
   //       console.log(user);
   //       return 0;
   //    });
   // }, []);

   useEffect(() => {
      axios
         .get(
            urls.searchUser +
               `?name=${user}&skill=${skill}&userType=${userType}`
         )
         .then((res) => {
            setuserList(res.data);
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

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
                     <Card.Header>Look up</Card.Header>
                     <ListGroup variant='flush'>
                        {userList
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
                                 <ListGroup.Item
                                    id='bootstrap-overrides'
                                    key={items.id}
                                    onClick={() => handleRouting(items.id)}
                                 >
                                    <h3 className='name'>{items.name}</h3>
                                    <h3 className='name'>
                                       Ratings:{items.rating}
                                    </h3>
                                 </ListGroup.Item>
                              );
                           })}
                     </ListGroup>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </Container>
   );
}
