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
   Badge,
   Button,
} from 'react-bootstrap';
import axios from 'axios';
import LookingFor from '../Components/Constants/lookingFor';
import SkillsBadge from '../Components/Constants/skillsBadge';
import bg from '../Components/learn.jpg';

export default function Home(props) {
   const { keywords } = props;
   const [skill, setSkill] = useState('');
   const [userType, setUserType] = useState(0);

   const history = useHistory();
   const [projectList, setProjectList] = useState(0);
   const [changeSkills, setChangeSkills] = useState(true);

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
            '/searchProjects' +
               `?id=${localStorage.userId}&skills=${skill}&keywords=${keywords}&participants=${userType}`
         )
         .then((res) => {
            console.log(res.data);
            if (res.data !== 'NO RECORDS FOUND') {
               setProjectList(res.data);
            } else {
               setProjectList(0);
            }
         })
         .catch((err) => {
            console.log(err);
         });
   }, [keywords, skill, userType]);

   const handleRouting = (projectId) => {
      history.push(`/search_project/${projectId}`);
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
                              <Dropdown>
                                 <Dropdown.Toggle
                                    variant='warning'
                                    id='dropdown-basic'
                                 >
                                    Filters
                                 </Dropdown.Toggle>

                                 <Dropdown.Menu>
                                    <InputGroup className='mb-3'>
                                       <InputGroup.Text id='basic-addon3'>
                                          search by skill
                                       </InputGroup.Text>
                                       <FormControl
                                          id='search-skills'
                                          aria-describedby='basic-addon3'
                                          placeholder='python'
                                          onChange={(e) =>
                                             setSkill(e.target.value)
                                          }
                                       />
                                    </InputGroup>
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
                                 </Dropdown.Menu>
                              </Dropdown>
                           </Card.Header>
                           <ListGroup variant='flush'>
                              {projectList ? (
                                 projectList
                                    .filter((contact) => {
                                       return (
                                          contact.title
                                             .toString()
                                             .toLowerCase()
                                             .indexOf(
                                                keywords
                                                   .toString()
                                                   .toLowerCase()
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
                                                <Card.Header id='project-search-header'>
                                                   <h4> {items.title}</h4>
                                                </Card.Header>
                                                <ListGroup variant='flush'></ListGroup>
                                                <ListGroup variant='flush'>
                                                   <ListGroup.Item>
                                                      <h5>Looking for</h5>
                                                      <Button
                                                         variant='danger'
                                                         style={{
                                                            margin: '0.25rem',
                                                            pointerEvents:
                                                               'none',
                                                         }}
                                                      >
                                                         <LookingFor
                                                            participants={
                                                               items.participants
                                                            }
                                                         />
                                                      </Button>
                                                   </ListGroup.Item>
                                                   <ListGroup.Item>
                                                      <h5>Skills required </h5>

                                                      <SkillsBadge
                                                         skills={items.skills}
                                                         type='success'
                                                      />
                                                   </ListGroup.Item>
                                                </ListGroup>
                                                <ListGroup variant='flush'>
                                                   <ListGroup.Item>
                                                      {items.createdDate}
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
