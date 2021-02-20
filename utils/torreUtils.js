"use strict";

/* 
Created by: David Bautista
  
 */

const fetch = require("node-fetch");
require("dotenv").config();

const torreUtils = () => {
  const mu = {};

  const torreUsersEndPoint =
    process.env.TORRE_USERS_API_URL || "I didn't read the deploy instructions";

  mu.getSkillsOfPeopleAroundMe = (strengths, maxStrengths, levelExperience) => {
    const skills = strengths
      .sort((a, b) => b.recommendations - a.recommendations)
      .map((s) => s.name.toLowerCase());

    const skillsRoles = skills.slice(0, maxStrengths || 5).map((s) => {
      return {
        "skill/role": {
          text: s,
          experience: levelExperience || "1-plus-year",
        },
      };
    });

    /* Payload for POST request */
    const payload = JSON.stringify({ or: skillsRoles });

    return new Promise((resolve, reject) =>
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
          resolve(leftSkills);
        })
        .catch(reject)
    );
  };

  return mu;
};

module.exports = torreUtils;
