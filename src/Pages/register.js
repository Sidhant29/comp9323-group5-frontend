import React, { useState } from "react";
import { Form, Button, Card, Badge } from "react-bootstrap";

export default function Register() {
  const [aquiredSkills, setAquiredSkills] = useState(["Swimming", "Java"]);
  const [desiredSkills, setDesiredSkills] = useState([]);
  return (
    <div
      style={{
        width: "40vw",
        margin: "auto",
        marginTop: "5vh",
        textAlign: "left",
      }}
    >
      <Card className="translucent">
        <Card.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Your Name" />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formBio">
              <Form.Label>Add Your Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Share a bit about Yourself"
              />
            </Form.Group>
            <Form.Group controlId="formAquiredSkills">
              <Form.Label>Skills you Possess</Form.Label>
              <Form.Control
                inline
                type="text"
                placeholder="Enter skills you wan to mentor for"
              />
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
              <br />
              <br />
              {aquiredSkills.map((element) => {
                return (
                  <Button
                    onClick={(event) => {
                      console.log(event.target.innerText);
                      let newArray = [...aquiredSkills].filter(
                        (item) => item + ` x` !== event.target.innerText
                      );
                      setAquiredSkills(newArray);
                    }}
                  >
                    {element} x
                  </Button>
                );
              })}
            </Form.Group>

            <Form.Group controlId="formDesiredSkills">
              <Form.Label>Skills you want to learn</Form.Label>
              <Form.Control
                inline
                type="text"
                placeholder="Enter skills you want to learn"
              />
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
              <br />
              <br />
              {desiredSkills.map((element) => {
                return (
                  <Button variant="success"
                    onClick={(event) => {
                      let newArray = [...desiredSkills].filter(
                        (item) => item + ` x` !== event.target.innerText
                      );
                      setDesiredSkills(newArray);
                    }}
                  >
                    {element} x
                  </Button>
                );
              })}
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
