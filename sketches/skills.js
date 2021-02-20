"use strict";

/* 
Created by: David Bautista
  In this draft, based on my strengths, I do a search in the API for people who also have this strength. 
  Then, with the information obtained from the API, I filter the skills, to return only those I don't have yet. 
  In this way, from my strengths I can find out what other skills I need to obtain or improve.
 */

const fetch = require("node-fetch");
require("dotenv").config();

const dataUtils = () => {
  const mu = {};

  const torreUsersEndPoint =
    process.env.TORRE_USERS_API_URL || "I didn't read the deploy instructions";

  mu.getSkillsByStrengths = (strengths) => {
    const skills = strengths
      .sort((a, b) => b.recommendations - a.recommendations)
      .map((s) => s.name.toLowerCase());

    const skillsRoles = skills.slice(0, 5).map((s) => {
      return {
        "skill/role": {
          text: s,
          experience: "1-plus-year",
        },
      };
    });

    const payload = JSON.stringify({ or: skillsRoles });

    /* Payload for POST request */
    console.log("payload", payload);

    fetch(torreUsersEndPoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: payload,
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed getting watson api response");
      })
      .then((responseJson) => {
        let leftSkills = responseJson.aggregators.skill;

        /* Filter only the ones I don't have in list above. */
        leftSkills = leftSkills.filter(
          (s) => !skills.includes(s.value.toLowerCase())
        );

        /* Skills that I should get or improve */
        console.log("leftskills", leftSkills);
      });
  };

  return mu;
};

const dU = dataUtils();
dU.getSkills();

module.exports = dataUtils;
