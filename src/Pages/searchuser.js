import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Card, Row, Container, Col, ListGroup, Image } from 'react-bootstrap';

export default function Searchuser(props) {
   const { user } = props;
   const history = useHistory();
   const [userList, setuserList] = useState([]);

   const fetchData = () => {
      return fetch(
         `http://localhost:8080/searchUser?name=${user}&skill=&userType=`
      )
         .then((res) => {
            return res.json();
         })
         .catch((err) => {
            console.log(err);
         });
   };

   useEffect(() => {
      fetchData().then((data) => {
         setuserList(data);
         //  console.log(userList);
         //  console.log(user);
         return 0;
      });
   }, []);

   //    const handleRouting = (contactData) => {
   //       ifClicked(contactData);
   //       history.push(`/contactlists`);
   //  };
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
