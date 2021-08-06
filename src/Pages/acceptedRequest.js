import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
   Card,
   Table,
   Row,
   CardColumns,
   Button,
   Spinner,
} from 'react-bootstrap';
import { showToast } from '../Components/Constants/toastServices';

export default function AcceptedRequest() {
   const [request, setRequest] = useState(0);

   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      axios
         .get('/users/pendingRequests' + `/${localStorage.userId}/AP`, {
            headers: {
               Accept: 'application/json',
               Authorization: localStorage.token,
            },
         })
         .then((res) => {
            setRequest(res.data);
            setIsLoading(false);
            console.log(res.data);
         })
         .catch((err) => {
            console.log(err);
            setRequest(0);
            setIsLoading(false);
         });
   }, []);

   if (isLoading) {
      return (
         <div style={{ margin: 'auto auto' }}>
            <Spinner animation='border' variant='primary' />
         </div>
      );
   }

   return (
      <div className='text-center'>
         <CardColumns>
            {request ? (
               request.map((message) => {
                  return (
                     <Card>
                        <Card.Header className='text-right'>
                           {message.userName}
                        </Card.Header>
                        <Card.Body>
                           <Card.Title>Project</Card.Title>
                           <Card.Text>{message.projectName}</Card.Text>
                           <Card.Title>Message</Card.Title>
                           <Card.Text>{message.participantType}</Card.Text>
                           <Card.Title>Date</Card.Title>
                           <Card.Text>{message.requestedDate}</Card.Text>
                        </Card.Body>
                     </Card>
                  );
               })
            ) : (
               <Card>
                  <Card.Title>No requests accepted so far!!</Card.Title>
               </Card>
            )}
         </CardColumns>
      </div>
   );
}
