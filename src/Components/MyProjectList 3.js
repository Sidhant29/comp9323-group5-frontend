import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { Card, Col, Row, CardColumns, Button, Spinner } from "react-bootstrap";

export default function MyProjectList() {
  
  const [projects, setProjects] = useState([
    {
      title: "",
      description: "",
      created: "",
      skills: [],
      lookingFor: "",
    }
  ]);
  const [isLoading,setIsLoading] = useState(true)
  
  let renderParticipant = (participant)=>{
    switch(participant){
      case 1: return "Mentor"
      break;
      case 2: return "Mentee"
      break;
      default:
        return "Mentor and Mentee"
    }
  }

  useEffect(()=>{
    axios.get(`/myProjects?id=${localStorage.userId}`,{
      headers:{
        Authorization: localStorage.token,
      }
    }).then((response)=>{
      console.log(response.data)
      setProjects(response.data);
      setIsLoading(false)
    })
  },[])

  if (isLoading) {
    return (
      <div style={{ margin: "auto auto" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }
  
  return (
    <div className="text-center">
      <CardColumns>
        {projects.map((project) => {
          return (
            <Card>
              <Card.Header className="text-right">
                <Button
                  variant="link"
                  style={{ color: "red" }}
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
                  Edit
                </Button>
              </Card.Header>
              <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Card.Text>{project.description}</Card.Text>
                <Card.Text>
                  Looking For <Badge variant="dark">{renderParticipant(project.participants)}</Badge>
                </Card.Text>
                <Card.Text>
                  <small className="text-muted">{project.created}</small>
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small>Skills Involved in the Project</small>
                <br />
                {project.skills.split(',').map((skill) => (
                  <Badge style={{ margin: "0.1rem" }} variant="success">
                    {skill}
                  </Badge>
                ))}
                <br />
              </Card.Footer>
            </Card>
          );
        })}
      </CardColumns>
    </div>
  );
}
