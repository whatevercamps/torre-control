import React, { useEffect, useState } from "react";

/* Dependencies */
import { Container, Row, Col } from "react-bootstrap";

/* Components */

export default function Overview(props) {
  /* props */
  const { torreUsername } = props.match.params;

  /* state */
  const [skills, setSkills] = useState(null);

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

  /* Effects */
  useEffect(() => {
    console.log("torreUsername", torreUsername);
    if (torreUsername && !skills) {
      getTorreSkillsByUsername(torreUsername);
    }
  }, [skills, torreUsername]);

  return (
    <div className='Overview'>
      <Container>
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}
