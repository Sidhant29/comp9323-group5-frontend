import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
   Card,
   Table,
   Modal,
   CardColumns,
   Button,
   Spinner,
} from 'react-bootstrap';
import { showToast } from '../Components/Constants/toastServices';
import AcceptedRequest from '../Pages/acceptedRequest';

export default function Notifications(props) {
   const [request, setRequest] = useState(0);
   const [apRequest, setApRequest] = useState(0);

   const [isLoading, setIsLoading] = useState(true);
   const approve = 'AP';
   const reject = 'RJ';

   useEffect(() => {
      axios
         .get('/users/pendingRequests' + `/${localStorage.userId}/PD`, {
            headers: {
               Accept: 'application/json',
               Authorization: localStorage.token,
            },
         })
         .then((res) => {
            setRequest(res.data);
            setIsLoading(false);
         })
         .catch((err) => {
            console.log(err);
            setRequest(0);
            setIsLoading(false);
         });
   }, []);

   const sendResponse = (connectionId, status) => {
      console.log(connectionId, status);
      axios
         .post(`/user/updateConnections/${connectionId}/${status}`, {
            headers: {
               Accept: 'application/json',
               Authorization: localStorage.token,
            },
         })
         .then((res) => {
            console.log(res.data);
            if (res.data === 'Connection request Approved') {
               showToast(`Accepted`, 'success');
            } else {
               showToast(`Rejected`, 'success');
            }
         })
         .catch((err) => {
            console.log(err);
         });
   };

   if (isLoading) {
      return (
         <div style={{ margin: 'auto auto' }}>
            <Spinner animation='border' variant='primary' />
         </div>
      );
   }

   return (
      <Modal {...props} aria-labelledby='contained-modal-title-vcenter'>
         <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>
               Using Grid in Modal
            </Modal.Title>
         </Modal.Header>
         <Modal.Body className='show-grid'>
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
                                 <Card.Text>
                                    {message.participantType}
                                 </Card.Text>
                                 <Card.Title>Date</Card.Title>
                                 <Card.Text>{message.requestedDate}</Card.Text>
                              </Card.Body>
                              <Card.Footer>
                                 <Button
                                    variant='success'
                                    onClick={() =>
                                       sendResponse(
                                          message.connectionId,
                                          approve
                                       )
                                    }
                                 >
                                    Accept
                                 </Button>
                                 <Button
                                    variant='danger'
                                    onClick={() =>
                                       sendResponse(
                                          message.connectionId,
                                          reject
                                       )
                                    }
                                 >
                                    Decline
                                 </Button>
                              </Card.Footer>
                           </Card>
                        );
                     })
                  ) : (
                     <Card>
                        <Card.Title>No new requests!!</Card.Title>
                     </Card>
                  )}
               </CardColumns>
               <AcceptedRequest />
            </div>
         </Modal.Body>
         <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
         </Modal.Footer>
      </Modal>
   );
}
