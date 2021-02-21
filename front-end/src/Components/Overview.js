import React, { useEffect, useState } from "react";

/* Dependencies */
import { Container, Row, Col, Card } from "react-bootstrap";

/* Components */
import SkillsAroundMe from "./SkillsAroundMe";
import MySkills from "./MySkills";

export default function Overview(props) {
  /* props */
  const { torreUsername } = props.match.params;

  /* state */
  const [skills, setSkills] = useState(null);
  const [peopleAroundMeSkills, setPeopleAroundMeSkills] = useState(null);

  /* Functions */
  const getTorreSkillsByUsername = (username) => {
    fetch(`/api/user/skills?username=${username}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed getting Torre response with 200 status");
      })
      .then((torreResponse) => {
        if (torreResponse) {
          setSkills(torreResponse);
        } else {
          throw new Error("failed getting Torre skills from username");
        }
      })
      .catch((error) => {
        console.log("Torre requesting error", error);
      });
  };

  const getPeopleAroundMeSkills = (mySkills) => {
    const payload = { strengths: mySkills };

    fetch("/api/skills/of-people", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed getting API response with 200 status");
      })
      .then((skillsResponse) => {
        if (skillsResponse) {
          setPeopleAroundMeSkills(skillsResponse);
        } else {
          throw new Error("failed getting Torre skills from my skills");
        }
      })
      .catch((error) => {
        console.log("API requesting error", error);
      });
  };

  /* Effects */
  useEffect(() => {
    if (torreUsername && !skills) {
      getTorreSkillsByUsername(torreUsername);
    }
  }, [skills, torreUsername]);

  useEffect(() => {
    if (skills) {
      getPeopleAroundMeSkills(skills);
    }
  }, [skills]);

  return (
    <div className='Overview'>
      <Container>
        <Row>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Skills around me</Card.Title>
                <Card.Subtitle className='text-muted'>
                  Let's see what skills the people around user {torreUsername}{" "}
                  have
                </Card.Subtitle>
                <hr />
                <SkillsAroundMe SkillsAroundMe={peopleAroundMeSkills} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>My skills</Card.Title>
                <Card.Subtitle className='text-muted'>
                  Let's see what skills {torreUsername} already have
                </Card.Subtitle>
                <hr />
                <MySkills skills={skills} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
