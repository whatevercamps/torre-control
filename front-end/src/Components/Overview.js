import React, { useEffect, useState } from "react";

/* Dependencies */
import { Container, Row, Col, Card } from "react-bootstrap";

/* Components */
import SkillsAroundMe from "./SkillsAroundMe";
import Loading from "./Loading";
import MySkills from "./MySkills";
import OpportunitiesReport from "./OpportunitiesReport/OpportunitiesReport";
import Houston from "./Houston/Houston";

export default function Overview(props) {
  /* props */
  const { torreUsername } = props.match.params;

  /* state */
  const [mySkills, setMySkills] = useState(null);
  const [peopleAroundMeSkills, setPeopleAroundMeSkills] = useState(null);
  const [opportunitiesReport, setOpportunitiesReport] = useState(null);
  const [sketchOpportunitiesReport, setSketchOpportunitiesReport] = useState(null);
  const [sketchMode, setSketchMode] = useState(null);
  const [remainingLoad, setRemainingLoad] = useState(0);

  /* Functions */

  const getTorreSkillsByUsername = (username) => {
    setRemainingLoad((s) => s + 1);
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
          setMySkills(torreResponse);
          setRemainingLoad((s) => s - 1);
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
    setRemainingLoad((s) => s + 1);
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
          setRemainingLoad((s) => s - 1);
        } else {
          throw new Error("failed getting Torre skills from my skills");
        }
      })
      .catch((error) => {
        console.log("API requesting error", error);
      });
  };

  const getOpportunitiesReport = (mySkills) => {
    const payload = { strengths: mySkills };
    setRemainingLoad((s) => s + 1);
    fetch("/api/opportunities/report", {
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
      .then((opportunitiesReportResponse) => {
        if (opportunitiesReportResponse) {
          console.log("opportunitiesReportResponse", opportunitiesReportResponse);
          setRemainingLoad((s) => s - 1);
          if (sketchMode) {
            setSketchOpportunitiesReport(opportunitiesReportResponse);
          } else {
            setOpportunitiesReport(opportunitiesReportResponse);
          }
        } else {
          throw new Error("failed getting Torre skills from my skills");
        }
      })
      .catch((error) => {
        console.log("API requesting error", error);
      });
  };

  const addSkill = (skill) => {
    setSketchMode(true);
    setMySkills((skills) => [...skills, { ...skill, sketch: true }]);
  };

  /* Effects */
  useEffect(() => {
    if (torreUsername && !mySkills) {
      getTorreSkillsByUsername(torreUsername);
    }
  }, [mySkills, torreUsername]);

  useEffect(() => {
    if (mySkills) {
      getOpportunitiesReport(mySkills);
      if (!sketchMode) {
        getPeopleAroundMeSkills(mySkills);
      }
    }
  }, [mySkills]);

  return (
    <div className='Overview'>
      {remainingLoad > 0 && <Loading loadingType={sketchMode ? "onlyBlur" : "block"} />}
      {(sketchMode || remainingLoad <= 0) && (
        <Container fluid>
          <Row>
            <Col md={9} className='charts'>
              <Row>
                <Col md={6}>
                  <Card className='dark'>
                    <Card.Body>
                      <Card.Title className='torreTitle'>My {sketchMode && <code>{"{sketch}"}</code>} skills</Card.Title>
                      <Card.Subtitle className='text-muted'>
                        Let's see what skills user <code>{torreUsername}</code> already have
                      </Card.Subtitle>
                      <hr />
                      <MySkills mySkills={mySkills} sketchMode={sketchMode} />
                    </Card.Body>
                  </Card>
                  <Card className='dark'>
                    <Card.Body>
                      <Card.Title className='torreTitle'>Skills around me</Card.Title>
                      <Card.Subtitle className='text-muted'>
                        Let's see what skills the people around user <code>{torreUsername}</code> have
                      </Card.Subtitle>
                      <hr />
                      <SkillsAroundMe SkillsAroundMe={peopleAroundMeSkills} addSkill={addSkill} />
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className='dark'>
                    <Card.Body>
                      <Card.Title className='torreTitle'>Opportunities</Card.Title>
                      <Card.Subtitle className='text-muted'>Let's see what job opportunities are around</Card.Subtitle>
                      <hr />
                      <OpportunitiesReport opportunitiesReport={opportunitiesReport} sketchOpportunitiesReport={sketchOpportunitiesReport} />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
            {/* TODO: Implement mobile view for chatbot */}
            <Col sm={false} md={3} className='no-padding d-none d-sm-none d-md-block'>
              <Houston />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
