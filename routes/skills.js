"use strict";

var express = require("express");
var router = express.Router();

const torreUtils = require("../utils/torreUtils")();

/* GET skills listing. */
router.post("/from-strengths", function (req, res, next) {
  const strengths = req.body.strengths;

  if (strengths && strengths.length) {
    torreUtils
      .getSkillsOfPeopleAroundMe(strengths)
      .then((skills) => {
        res.json(skills);
      })
      .catch(next);
  }
});

module.exports = router;
