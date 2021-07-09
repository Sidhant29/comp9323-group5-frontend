import {
   Jumbotron,
   Container,
   Card,
   Button,
   Form,
   CardDeck,
   Nav,
} from 'react-bootstrap';
import React, { useState } from 'react';

function UserProfile() {
   const [aquiredSkills, setAquiredSkills] = useState(['Swimming', 'Java']);
   const [showDetails, setShowDetails] = useState(true);
   const [desiredSkills, setDesiredSkills] = useState([
      'C++',
      'Api Development',
   ]);

   function MyProjects() {
      return <div>MY PROJECTS</div>;
   }

   function UserDetails() {
      return (
         <div>
            <Card style={{ marginBottom: '1rem' }}>
               <Card.Body>
                  Name
                  <br />
                  Email
                  <br />
                  Bio
                  <br />
                  Change password
                  <br />
               </Card.Body>
            </Card>
            <CardDeck>
               <Card>
                  <Card.Header>
                     <Card.Title>MY SKILLS </Card.Title>
                     {aquiredSkills.map((element) => {
                        return (
                           <Button
                              variant='success'
                              style={{ margin: '0.25rem' }}
                              onClick={(event) => {
                                 console.log(event.target.innerText);
                                 let newArray = [...aquiredSkills].filter(
                                    (item) =>
                                       item + ` x` !== event.target.innerText
                                 );
                                 setAquiredSkills(newArray);
                              }}
                           >
                              {element} x
                           </Button>
                        );
                     })}
                  </Card.Header>
                  <Card.Body>
                     <Form>
                        <Form.Group controlId='formAquiredSkills'>
                           <Form.Control
                              inline
                              type='text'
                              placeholder='Enter skills you wan to mentor for'
                           />
                        </Form.Group>
                        <Button
                           onClick={() => {
                              setAquiredSkills([
                                 ...aquiredSkills,
                                 document.getElementById('formAquiredSkills')
                                    .value,
                              ]);
                           }}
                           variant='secondary'
                        >
                           Add Skill
                        </Button>
                     </Form>
                  </Card.Body>
               </Card>
               <Card>
                  <Card.Header>
                     <Card.Title>NOT MY SKILLS </Card.Title>
                     {desiredSkills.map((element) => {
                        return (
                           <Button
                              variant='warning'
                              style={{ margin: '0.25rem' }}
                              onClick={(event) => {
                                 console.log(event.target.innerText);
                                 let newArray = [...desiredSkills].filter(
                                    (item) =>
                                       item + ` x` !== event.target.innerText
                                 );
                                 setDesiredSkills(newArray);
                              }}
                           >
                              {element} x
                           </Button>
                        );
                     })}
                  </Card.Header>
                  <Card.Body>
                     <Form>
                        <Form.Group controlId='formDesiredSkills'>
                           <Form.Control
                              inline
                              type='text'
                              placeholder='Enter skills you want to learn'
                           />
                        </Form.Group>
                        <Button
                           onClick={() => {
                              setDesiredSkills([
                                 ...desiredSkills,
                                 document.getElementById('formDesiredSkills')
                                    .value,
                              ]);
                           }}
                           variant='secondary'
                        >
                           Add Skill
                        </Button>
                     </Form>
                  </Card.Body>
               </Card>
            </CardDeck>
         </div>
      );
   }
   return (
      <div style={{ margin: '2rem' }}>
         <Jumbotron fluid>
            <Container>
               <h1>User Name</h1>
               <p>
                  My Bio. This is just a display text, so that we can tell
                  people about ourselves and reach out to other people too.
               </p>
            </Container>
         </Jumbotron>
         <Card>
            <Card.Header>
               <Nav variant='pills' defaultActiveKey='#first'>
                  <Nav.Item>
                     <Nav.Link onClick={() => setShowDetails(true)}>
                        My Details
                     </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                     <Nav.Link onClick={() => setShowDetails(false)}>
                        My Projects
                     </Nav.Link>
                  </Nav.Item>
               </Nav>
            </Card.Header>
            <Card.Body>
               {showDetails ? <UserDetails /> : <MyProjects />}
            </Card.Body>
         </Card>
      </div>
   );
}

export default UserProfile;
