import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
   Card,
   Col,
   Row,
   Container,
   Form,
   Table,
   FormControl,
   InputGroup,
   Badge,
   Button,
   ListGroup,
} from 'react-bootstrap';

export default function TopUsers() {
   const [leaders, setLeaders] = useState([]);
   let key = 0;

   useEffect(() => {
      axios
         .get('/users', {
            headers: {
               Accept: 'application/json',
               Authorization: localStorage.token,
            },
         })
         .then((res) => {
            if (res.data !== 'NO RECORDS FOUND') {
               console.log(res.data);
               setLeaders(res.data);
            } else {
            }
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);
   return (
      <Card
         style={{ width: '100%', backgroundColor: '#242526', minHeight:"100vh" }}
         className='translucent'
      >
      <Card.Body style={{ minHeight:"100vh" ,minWidth: "80vw", margin: "auto", backgroundColor:"#3A3B3C"}}>
      <h1 style={{ color: '#ffc107', textAlign:"center" }}>Top Rated Users</h1>
      <div>
         <Table striped bordered hover>
            <thead>
               <tr>
                  <th style={{color:"white"}}>Rank</th>
                  <th style={{color:"white"}}>First Name</th>
                  <th style={{color:"white"}}>Last Name</th>
                  <th style={{color:"white"}}>Points</th>
               </tr>
            </thead>
            <tbody>
               {leaders.map((element) => {
                  key = key + 1;
                  return (
                     <tr>
                        <td style={{color:"white"}}>{key}</td>
                        <td style={{color:"white"}}>{element.firstName}</td>
                        <td style={{color:"white"}}>{element.lastName}</td>
                        <td style={{color:"white"}}>{element.score}</td>
                     </tr>
                  );
               })}
            </tbody>
         </Table>
      </div>
      </Card.Body>
      </Card>
   );
}
