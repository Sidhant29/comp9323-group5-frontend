import React, { useState, useEffect } from 'react';
import { Card, Col, Row, CardColumns, Badge, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import axios from 'axios';

export default function ProjectPage() {
   const { projectId } = useParams();

   const [projects, setProjects] = useState([]);

   //    const handleChange = (event) => {
   //     const value = event.target.value;
   //     console.log(value);
   //     if (value === '1') {
   //        setEmailPayload({
   //           ...emailPayload,
   //           ['lookingFor']: 1,
   //        });
   //     } else if (value === '2') {
   //        setEmailPayload({
   //           ...emailPayload,
   //           ['lookingFor']: 2,
   //        });
   //     }
   //     console.log(value);
   //  };

   useEffect(() => {
      console.log(localStorage.token);
      axios
         .get('/project' + `/${projectId}`, {
            headers: {
               Accept: 'application/json',
               Authorization: localStorage.token,
            },
         })
         .then((res) => {
            setProjects(res.data);
            //   setEmailPayload({
            //      ...emailPayload,
            //      ['receiverId']: res.data.id,
            //   });
            console.log(res.data);
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

   return (
      <div className='text-center'>
         <CardColumns>
            <Card>
               <Card.Body>
                  <Card.Title>
                     <Button
                        variant='link'
                        onClick={() => {
                           console.log('clicked');
                        }}
                     >
                        {projects.title}
                     </Button>
                  </Card.Title>
                  <Card.Text>{projects.description}</Card.Text>
                  <Card.Text>
                     <small className='text-muted'>{projects._date}</small>
                  </Card.Text>
                  <Card.Text>
                     <small className='text-muted'>
                        Posted by
                        {projects.user_name}
                     </small>
                  </Card.Text>
                  <Card.Footer>
                     <small> skills required </small>
                     <br />

                     <Badge style={{ margin: '0.1rem' }} variant='primary'>
                        {projects.skills}
                     </Badge>
                  </Card.Footer>
               </Card.Body>
            </Card>
         </CardColumns>
      </div>
   );
}
