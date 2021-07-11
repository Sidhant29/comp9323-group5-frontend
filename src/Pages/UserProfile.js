import {
  Jumbotron,
  Container,
  Card,
  Button,
  Form,
  CardDeck,
  Nav,
  Badge,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import ProjectList from "../Components/ProjectList";
import axios from "axios";



function UserProfile() {
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [userDetailsLoading, setUserDetailsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: 0,
    rating: null,
    bio: "",
  });
  const [aquiredSkills, setAquiredSkills] = useState([""]);
  const [desiredSkills, setDesiredSkills] = useState([""]);
  const [showDetails, setShowDetails] = useState(true);
  console.log(`/user/${localStorage.userId}`);
  console.log(localStorage.token);
  useEffect(() => {
    axios
      .get(`/user/${localStorage.userId}`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((response) => {
        setUserDetails({
          firstName: response.data.firstName,
          lastname: response.data.lastName,
          email: response.data.email,
          bio: response.data.bio,
          phoneNumber:response.data.phoneNumber,
          acquiredSkills:aquiredSkills.join(),
          learningSkills:desiredSkills.join()
        });
        setAquiredSkills(response.data.acquiredSkills.split(","));
        setDesiredSkills(response.data.learningSkills.split(","));
        setUserDetailsLoading(false);
        console.log(response.data);
      });
  }, []);

  function editProfile(){
    axios
      .post(`/user/update/${localStorage.userId}`, {
        ...userDetails,

      } ,{
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((response) => {
        setUserDetailsLoading(false);
        console.log(response.data);
      });
  }

  function MainJumbotron() {
    if (userDetailsLoading) {
      return <Spinner animation="border" variant="primary" />;
    } else {
      return (
        <Jumbotron fluid>
          <Container>
            <h1>{`${userDetails.firstName} ${userDetails.lastname}`}</h1>
            <p>{userDetails.bio}</p>
            I can Mentor<br/>
            {aquiredSkills.map((skill)=>{
              return (<Badge variant="success" style={{marginRight:"0.1rem"}}>{skill}</Badge>);
            })}
            <br/>I am interesred in learning<br/>
            {desiredSkills.map((skill)=>{
              return (<Badge variant="warning" style={{marginRight:"0.1rem"}}>{skill}</Badge>);
            })}
            
          </Container>
        </Jumbotron>
      );
    }
  }
  function UserDetails() {
    if (userDetailsLoading) {
      return (
        <div style={{ margin: "auto auto" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      );
    } else {
      return (
        <div>
          <Card style={{ marginBottom: "1rem" }}>
            <Card.Body>
              <Form>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control placeholder={userDetails.firstName} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control placeholder={userDetails.lastName} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder={userDetails.email}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder={userDetails.phoneNumber}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="formBio">
                      <Form.Label>Your Bio</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder={userDetails.bio}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
          <CardDeck>
            <Card>
              <Card.Header>
                <Card.Title>MY SKILLS </Card.Title>
                {aquiredSkills.map((element) => {
                  return (
                    <Button variant="success" style={{ margin: "0.25rem" }}>
                      {element}{" "}
                      <Badge
                        onClick={(event) => {
                          let newArray = [...aquiredSkills].filter(
                            (item) => item !== element
                          );
                          setAquiredSkills(newArray);
                        }}
                        variant="dark"
                      >
                        x
                      </Badge>
                    </Button>
                  );
                })}
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formAquiredSkills">
                    <Form.Control
                      inline
                      type="text"
                      placeholder="Enter skills you wan to mentor for"
                    />
                  </Form.Group>
                  <Button
                    onClick={() => {
                      setAquiredSkills([
                        ...aquiredSkills,
                        document.getElementById("formAquiredSkills").value,
                      ]);
                    }}
                    variant="secondary"
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
                    <Button variant="warning" style={{ margin: "0.25rem" }}>
                      {element}{" "}
                      <Badge
                        onClick={(event) => {
                          console.log(event.target.innerText);
                          let newArray = [...desiredSkills].filter(
                            (item) => item !== element
                          );
                          setDesiredSkills(newArray);
                        }}
                        variant="dark"
                      >
                        x
                      </Badge>
                    </Button>
                  );
                })}
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formDesiredSkills">
                    <Form.Control
                      inline
                      type="text"
                      placeholder="Enter skills you want to learn"
                    />
                  </Form.Group>
                  <Button
                    onClick={() => {
                      setDesiredSkills([
                        ...desiredSkills,
                        document.getElementById("formDesiredSkills").value,
                      ]);
                    }}
                    variant="secondary"
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
  }
  return (
    <div style={{ margin: "2rem" }}>
      <MainJumbotron />
      <Card>
        <Card.Header>
          <Nav variant="pills" defaultActiveKey="#first">
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
          {showDetails ? (
            <UserDetails />
          ) : (
            <ProjectList isLoading={projectsLoading} />
          )}
        </Card.Body>
        <Card.Footer
          style={{ display: "flex", justifyContent: "center", alignItem: "center" }}
        >
          <Button onClick={editProfile}>Save Changes</Button>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default UserProfile;
