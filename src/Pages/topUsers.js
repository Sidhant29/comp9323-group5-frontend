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
      <div>
         <Table striped bordered hover>
            <thead>
               <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Points</th>
               </tr>
            </thead>
            <tbody>
               {leaders.map((element) => {
                  key = key + 1;
                  return (
                     <tr>
                        <td>{key}</td>
                        <td>{element.firstName}</td>
                        <td>{element.lastName}</td>
                        <td>{element.score}</td>
                     </tr>
                  );
               })}
            </tbody>
         </Table>
      </div>
   );
}
