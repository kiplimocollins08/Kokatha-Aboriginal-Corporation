const express = require('express');

const { MembershipModel, LinkModel } = require('../models');

const router = express.Router();

// Get one member
router.get("/id/:member_id", async (req, res) => {
  const id = req.params.member_id;
  console.log(`/id/${id}`)
  try {
    const member = await MembershipModel.findOne({member_id: id});
    console.log(member);
    res.json(member);
  } catch(err) {
    res.status(400).json({
      "message": "no such member",
      "err": err.message
    })
  }
})

router.get("/approved", async (req, res) => {
  try {
    const members = await MembershipModel.find({approved: true});
    res.json(members);
  } catch(err) {
    res.status(500).json({
      "message": "Error occured"
    })
  }
})

module.exports = router