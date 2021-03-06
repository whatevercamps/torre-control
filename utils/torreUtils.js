"use strict";

/* 
Created by: David Bautista
  
 */

//dependencies
const fetch = require("node-fetch");
require("dotenv").config();

/* Support Functions */

const getSkillsPayload = (strengths, maxStrengths, levelExperience) => {
  const numberOfSketchSkills = strengths.filter((s) => s.sketch).length;
  const skills = strengths
    .sort((a, b) => (b.recommendations || 0) + (b.weight || 0) + (b.value || 0) - ((a.recommendations || 0) + (a.weight || 0) + (a.value || 0)))
    .map((s) => s.name.toLowerCase());

  console.log("numberOfSketchSkills", numberOfSketchSkills);
  const skillsRoles = skills.slice(0, (maxStrengths || 5) + numberOfSketchSkills).map((s) => {
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

// Get agregartors torre search reducer function
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
  const { payload, skills } = getSkillsPayload(strengths, maxStrengths, levelExperience);
  return new Promise((resolve, reject) =>
    getAggregatorsOf(endpoint, payload)
      .then((aggregators) => {
        let leftSkills = aggregators.aggregators.skill;

        /* Filter only the ones I don't have in list above. */
        leftSkills = leftSkills.filter((s) => !skills.includes(s.value.toLowerCase()));

        /* Skills that I should get or improve */
        resolve(leftSkills);
      })
      .catch(reject)
  );
};

/* Torre Utils Implementation Module  */
const torreUtils = () => {
  const utils = {};

  const torrePeopleEndpoint = process.env.TORRE_PEOPLE_API_URL || "I didn't read the deploy instructions";

  const torreOpportunitiesEndpoint = process.env.TORRE_OPPORTUNITIES_API_URL || "I didn't read the deploy instructions";

  const torreStrengthsSkillsEndpoint = process.env.TORRE_STRENGTHS_API_URL || "I didn't read the deploy instructions";

  // handler that retreive skills of people similar to user in terms of the skills they share.
  utils.getSkillsOfPeopleAroundMe = (strengths, maxStrengths, levelExperience) => {
    return getSkillsOf(torrePeopleEndpoint, strengths, maxStrengths, levelExperience);
  };
  // handler that retreive skills of opportunities similar to user in terms of the skills they share.
  utils.getSkillsOfOpportunitiesAroundMe = (strengths, maxStrengths, levelExperience) => {
    return getSkillsOf(torreOpportunitiesEndpoint, strengths, maxStrengths, levelExperience);
  };

  // handler that retreive skills of one user.
  utils.getUserSkills = (username) => {
    const endpoint = torreStrengthsSkillsEndpoint.replace("<username>", username);

    console.log("endpoint", endpoint);

    return fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200) return response.json();
      throw new Error(`failed getting Torre API response 200, got status ${response.status}`);
    });
  };

  utils.getOpportunitiesSalaryRange = (strengths, maxStrengths, levelExperience) => {
    const { payload } = getSkillsPayload(strengths, maxStrengths, levelExperience);

    return new Promise((resolve, reject) =>
      getAggregatorsOf(torreOpportunitiesEndpoint, payload)
        .then(({ aggregators }) => {
          resolve(aggregators.compensationrange);
        })
        .catch(reject)
    );
  };

  utils.getOpportunitiesReport = (strengths, maxStrengths, levelExperience) => {
    const { payload } = getSkillsPayload(strengths, maxStrengths, levelExperience);

    console.log("report payload", payload);

    return new Promise((resolve, reject) =>
      getAggregatorsOf(torreOpportunitiesEndpoint, payload)
        .then((aggregatorsResponse) => {
          let { aggregators } = aggregatorsResponse;
          let report = [];
          try {
            delete aggregators.organization;
            delete aggregators.remote;
            delete aggregators.status;
            delete aggregators.skill;
          } catch (err) {
            reject(err);
          }

          for (let aggregatorName in aggregators) {
            let aggregator = aggregators[aggregatorName];

            aggregator = aggregator.map((option) => {
              return {
                name: aggregatorName,
                option: option.value,
                current: option.total,
              };
            });
            report.push(aggregator);
          }
          resolve(report);
        })
        .catch(reject)
    );
  };

  return utils;
};

module.exports = torreUtils;
