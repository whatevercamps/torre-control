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

  /* My strengths hardcoded for this sketch*/
  const strengths = [
    {
      id: "ZNO6Zvry",
      code: 6670201,
      name: "Vue",
      additionalInfo: "",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2021-02-19T05:05:32",
    },
    {
      id: "xM9neqWj",
      code: 754,
      name: "SWIFT",
      additionalInfo: "",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2021-02-19T05:04:57",
    },
    {
      id: "9MBbzGaM",
      code: 23009,
      name: "CSS",
      additionalInfo: "",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2021-02-19T05:04:34",
    },
    {
      id: "WNV6qW1N",
      code: 23802,
      name: "HTML",
      additionalInfo: "",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2021-02-19T05:04:27",
    },
    {
      id: "eynY9D3j",
      code: 6362926,
      name: "Jupyter Notebook",
      additionalInfo: "",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2021-02-19T05:04:06",
    },
    {
      id: "XMqKBO9y",
      code: 32056,
      name: "Python",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2021-02-18T23:33:23",
    },
    {
      id: "OMvA5J3N",
      code: 135210,
      name: "Machine learning",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2021-02-18T23:26:13",
    },
    {
      id: "bjAb80Dy",
      code: 18065,
      name: "D3.js",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2021-02-18T23:26:00",
    },
    {
      id: "JMeJwoQj",
      code: 29221,
      name: "D3",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2021-02-18T23:25:56",
    },
    {
      id: "EM3bwABN",
      code: 55347,
      name: "Data analysis",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2021-02-18T23:22:33",
    },
    {
      id: "KNxv58bj",
      code: 32590,
      name: "TypeScript",
      additionalInfo: "",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2021-02-18T23:11:29",
    },
    {
      id: "qy00x3ly",
      code: 18319,
      name: "Javascript",
      additionalInfo: "",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2021-02-18T23:11:24",
    },
    {
      id: "gyY6X2oN",
      code: 55906,
      name: "Java",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2021-02-18T23:11:18",
    },
    {
      id: "zNGbYGny",
      code: 56414,
      name: "Node.js",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2021-02-18T23:11:14",
    },
    {
      id: "qNP639rj",
      code: 5993,
      name: "AWS",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2021-02-18T23:11:06",
    },
    {
      id: "RyDbDP8M",
      code: 17809,
      name: "AWS Lambda",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2021-02-18T23:11:02",
    },
    {
      id: "0yzJkaXy",
      code: 59925,
      name: "Node",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2021-02-18T23:10:49",
    },
    {
      id: "pyJ6KPWy",
      code: 6085401,
      name: "Software architecture",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2021-02-18T23:10:09",
    },
    {
      id: "ny1xKpvj",
      code: 29346,
      name: "Django",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2021-02-18T22:54:54",
    },
    {
      id: "kybpxgKM",
      code: 50182,
      name: "React",
      weight: 277.8762,
      recommendations: 1,
      media: [],
      created: "2021-02-18T22:54:43",
    },
    {
      id: "0yzJklgy",
      code: 133267,
      name: "Full-stack Development",
      weight: 283.3333,
      recommendations: 3,
      media: [],
      created: "2021-02-18T21:21:08",
    },
    {
      id: "vN8bmGej",
      code: 55521,
      name: "Front-end development",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2021-02-18T21:21:02",
    },
    {
      id: "xyXng3xM",
      code: 6080846,
      name: "Data visualization",
      weight: 0,
      recommendations: 1,
      media: [],
      created: "2021-02-18T21:20:52",
    },
    {
      id: "LMgX4l7j",
      code: 6088881,
      name: "Visualación de datos",
      weight: 283.3333,
      recommendations: 1,
      media: [],
      created: "2021-02-18T21:20:46",
    },
    {
      id: "pyJ6K8oy",
      code: 54169,
      name: "Tutoring",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2021-02-18T21:20:32",
    },
    {
      id: "OMvA5nON",
      code: 20923,
      name: "Design",
      weight: 0,
      recommendations: 0,
      media: [],
      created: "2021-02-18T21:20:19",
    },
    {
      id: "bjAb8mYy",
      code: 61332,
      name: "Software development",
      weight: 283.3333,
      recommendations: 3,
      media: [],
      created: "2021-02-18T21:20:08",
    },
  ];

  mu.getSkills = () => {
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
