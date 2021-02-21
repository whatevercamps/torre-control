"use strict";

var express = require("express");
var router = express.Router();

const torreUtils = require("../utils/torreUtils")();

/* GET skills listing. */
router.get("/skills", function (req, res, next) {
  const username = req.query.username;

  if (username && username.length) {
    torreUtils
      .getUserSkills(username)
      .then((skills) => {
        res.json(
          skills.map((s) => {
            return {
              name: s.name,
              weight: s.weight,
              recommendations: s.recommendations,
            };
          })
        );
      })
      .catch(next);
  } else {
    res.status(400).json({
      sucess: false,
      message: "please, provide a valid Torre username",
    });
  }
});

module.exports = router;
