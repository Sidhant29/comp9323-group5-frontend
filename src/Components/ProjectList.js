import { useState } from "react";
import { Card, Col, Row, CardColumns, Badge, Button } from "react-bootstrap";

export default function ProjectList() {
  const [projects, setProjects] = useState([
    {
      title: "Sample project 1",
      description: "Project 1 description",
      created: "2021-03-10",
      skills: ["Swimming", "Javascript"],
    },
    {
      title: "Sample project 2",
      description: "Project 2 description",
      created: "2021-01-11",
      skills: ["Python", "Java"],
    },
  ]);
  return (
    <div className="text-center">
      <CardColumns>
        {projects.map((project) => {
          return (
            <Card>
              <Card.Header className="text-right">
                <Button
                  variant="link"
                  style={{color:'red'}}
                  onClick={() => {
                    console.log("clicked");
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="link"
                  onClick={() => {
                    console.log("clicked");
                  }}
                >
                  Edit ->
                </Button>
              </Card.Header>
              <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Card.Text>{project.description}</Card.Text>
                <Card.Text>
                  <small className="text-muted">{project.created}</small>
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small> Mentor skills required </small>
                  <br />
                  {project.skills.map((skill) => (
                    <Badge style={{ margin: "0.1rem" }} variant="success">
                      {skill}
                    </Badge>
                  ))}
                  <br />
                  <small> Mentee skills </small>
                  <br />
                  {project.skills.map((skill) => (
                    <Badge style={{ margin: "0.1rem" }} variant="warning">
                      {skill}
                    </Badge>
                  ))}
                </Card.Footer>
            </Card>
          );
        })}
      </CardColumns>
    </div>
  );
}
