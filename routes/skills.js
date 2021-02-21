"use strict";

var express = require("express");
var router = express.Router();

const torreUtils = require("../utils/torreUtils")();

/* GET skills listing. */
router.post("/of-people", function (req, res, next) {
  const strengths = req.body.strengths;
  //TODO: Handle if strengths is null;
  if (strengths && strengths.length) {
    torreUtils
      .getSkillsOfPeopleAroundMe(strengths)
      .then((skills) => {
        res.json(skills);
      })
      .catch(next);
  }
});
router.post("/of-oportunities", function (req, res, next) {
  const strengths = req.body.strengths;

  //TODO: Handle if strengths is null;
  if (strengths && strengths.length) {
    torreUtils
      .getSkillsOfOportunitiesAroundMe(strengths)
      .then((skills) => {
        res.json(skills);
      })
      .catch(next);
  }
});

module.exports = router;
