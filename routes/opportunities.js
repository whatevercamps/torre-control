"use strict";

var express = require("express");
var router = express.Router();

const torreUtils = require("../utils/torreUtils")();

/* GET opportunities with need certain skills. */
router.post("/", function (req, res, next) {
  const strengths = req.body.strengths;
  //TODO: Handle if strengths is null;
  if (strengths && strengths.length) {
    torreUtils
      .getOpportunitiesBySkills(strengths)
      .then((opportunities) => {
        res.json(opportunities);
      })
      .catch(next);
  }
});

/* GET opportunities salary-range with certain skills. */
router.post("/salary-range", function (req, res, next) {
  const strengths = req.body.strengths;
  //TODO: Handle if strengths is null;
  if (strengths && strengths.length) {
    torreUtils
      .getOpportunitiesSalaryRange(strengths)
      .then((opportunities) => {
        res.json(opportunities);
      })
      .catch(next);
  }
});

/* GET opportunities information with certain skills. */
router.post("/info", function (req, res, next) {
  const strengths = req.body.strengths;
  //TODO: Handle if strengths is null;
  if (strengths && strengths.length) {
    torreUtils
      .getOpportunitiesInfo(strengths)
      .then(({ aggregators }) => {
        try {
          delete aggregators.organization;
          delete aggregators.status;
          delete aggregators.skill;
        } catch (e) {
          true;
        }
        res.json(aggregators);
      })
      .catch(next);
  }
});

module.exports = router;
