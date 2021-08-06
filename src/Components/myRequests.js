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
   const [show, setShow] = useState(false);

   const [isLoading, setIsLoading] = useState(true);
   const approve = 'AP';
   const reject = 'RJ';

   useEffect(() => {
      console.log(props);
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
            setShow(true);
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
      <Modal
         show={props.show}
         onHide={props.onHide}
         size='lg'
         aria-labelledby='contained-modal-title-vcenter'
         centered
      >
         <div className='text-center'>
            <Card bg='dark'>
               <Card.Body className='container'>
                  {/* <Card.Header id='user-details-header'>
                  <div>
                     <h3>My Requests</h3>
                  </div>
                  <div>
                     <Button variant='danger' onClick={props.onHide}>
                        X
                     </Button>
                  </div>
               </Card.Header> */}
                  <Card>
                     <Card.Header>
                        <div>
                           <h3>Pending Requests</h3>
                        </div>
                     </Card.Header>
                     {request ? (
                        request.map((message) => {
                           return (
                              <Table striped bordered hover>
                                 <thead>
                                    <tr>
                                       <th>Sender Name</th>
                                       <th>Project Name</th>
                                       <th>Message</th>
                                       <th>Date</th>
                                       <th>Action</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    <tr>
                                       <td>{message.userName}</td>
                                       <td>{message.projectName}</td>
                                       <td>{message.messageToUser}</td>
                                       <td>{message.requestedDate}</td>
                                       <td>
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
                                       </td>
                                       <td>
                                          {' '}
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
                                       </td>
                                    </tr>
                                 </tbody>
                              </Table>
                           );
                        })
                     ) : (
                        <div>
                           <Card>
                              <Card.Title>No new requests!!</Card.Title>
                           </Card>
                        </div>
                     )}
                  </Card>
               </Card.Body>
            </Card>
            <AcceptedRequest />
         </div>
      </Modal>
   );
}
