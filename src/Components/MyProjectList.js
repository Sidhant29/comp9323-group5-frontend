import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { Card, Col, Row, CardColumns, Button, Spinner } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

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

  function apiChangeStatus(project){
    let proj = project
    console.log(proj)
    if(proj.project_status==0){
      proj.project_status=1 
    }else{
      proj = {...proj,project_status:0}
    }
    axios
         .post(`/project/update/${proj.id}`, { 
            title:proj.title,
            description:proj.description,
            url:proj.url,
            project_status:proj.project_status,
            participants:proj.participants,
            skills: proj.skills }, {
            headers: {
               Authorization: localStorage.token,
            },
         })
         .then((response) => {
            alert(`${project.title} updated`);
         })
         .catch((error) => {
            console.log(error);
         });
  }

  if (isLoading) {
    return (
      <div style={{ margin: "auto auto" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if(projects==="NO PROJECTS FOUND"){
    return <h4>{projects}</h4>
  }

  return (
    <div className="text-center">
      <CardColumns>
        {projects.map((project) => {
          return (
            <Card>
              <Card.Header className="text-right">
                {project.project_status==1?(<Button
                  variant="link"
                  style={{ color: "green" }}
                  onClick={() => {
                    apiChangeStatus(project)
                  }}
                >
                  Go Offline
                </Button>):
                (<Button
                  variant="link"
                  style={{ color: "red" }}
                  onClick={() => {
                    apiChangeStatus(project)
                  }}
                >
                  Go Online
                </Button>)
                }
                <Button
                  variant="link"
    
                ><Link to={`/project/update/${project.id}`}>Edit -></Link>
                  
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
