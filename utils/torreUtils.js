"use strict";

/* 
Created by: David Bautista
  
 */

//dependencies
const fetch = require("node-fetch");
require("dotenv").config();

/* Support Functions */

const getSkillsPayload = (strengths, maxStrengths, levelExperience) => {
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
  // Payload to be returned
  const payload = JSON.stringify({ or: skillsRoles });

  return { payload: payload, skills: skills };
};

// Get agregartor reducer function
const getAggregatorsOf = (endpoint, payload) => {
  return fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: payload,
  }).then((response) => {
    if (response.status === 200) return response.json();
    throw new Error("failed getting Torre API response");
  });
};

// Get Skills reducer function
const getSkillsOf = (endpoint, strengths, maxStrengths, levelExperience) => {
  //payload to send in POST request body
  const { payload, skills } = getSkillsPayload(
    strengths,
    maxStrengths,
    levelExperience
  );

  return new Promise((resolve, reject) =>
    getAggregatorsOf(endpoint, payload)
      .then((aggregators) => {
        let leftSkills = aggregators.aggregators.skill;

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

const torreUtils = () => {
  const mu = {};

  const torrePeopleEndpoint =
    process.env.TORRE_PEOPLE_API_URL || "I didn't read the deploy instructions";

  const torreOportunitiesEndpoint =
    process.env.TORRE_OPORTUNITIES_API_URL ||
    "I didn't read the deploy instructions";

  const torreStrengthsSkillsEndpoint =
    process.env.TORRE_STRENGTHS_API_URL ||
    "I didn't read the deploy instructions";

  mu.getSkillsOfPeopleAroundMe = (strengths, maxStrengths, levelExperience) => {
    return getSkillsOf(
      torrePeopleEndpoint,
      strengths,
      maxStrengths,
      levelExperience
    );
  };

  mu.getSkillsOfOportunitiesAroundMe = (
    strengths,
    maxStrengths,
    levelExperience
  ) => {
    return getSkillsOf(
      torreOportunitiesEndpoint,
      strengths,
      maxStrengths,
      levelExperience
    );
  };

  mu.getUserSkills = (username) => {
    const endpoint = torreStrengthsSkillsEndpoint.replace(
      "<username>",
      username
    );

    console.log("endpoint", endpoint);

    return fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200) return response.json();
      throw new Error(
        `failed getting Torre API response 200, got status ${response.status}`
      );
    });
  };

  return mu;
};

module.exports = torreUtils;
