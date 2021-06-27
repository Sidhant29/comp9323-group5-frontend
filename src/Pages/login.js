import React from "react";
import { Form, Button, Card } from "react-bootstrap";

export default function Login() {
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
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
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
