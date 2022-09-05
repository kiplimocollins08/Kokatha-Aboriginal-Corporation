const express = require('express');

const { MembershipModel, LinkModel } = require('../models');

const router = express.Router();


// Post Method
router.post('/post', (req, res) => {
  res.send("Post API");
})

// Create Membership
router.post('/create_member', async (req, res) => {
  const body = req.body;
  const member = new MembershipModel({
    first_name: body.first_name,
    last_name: body.last_name,
    single_name: body.single_name,
    aka: body.aka,
    mobile: body.mobile,
    email: body.email,
    home_phone: body.home_phone,
    work_phone: body.work_phone,
    member_id: body.member_id,
    street_address: body.street_address,
    suburb: body.suburb,
    state: body.state,
    dob: body.dob,
    date_of_membership: body.date_of_membership
  })

  try {
    const saved = await member.save();
    res.status(201).json(saved);
  } catch(err) {
    res.status(400).json({
      message: err.message
    })
  }
})

// Create Link
router.post('/create_link/:member_id', async (req, res) => {
  const id = req.params.member_id;
  const body = req.body;
  try{
    const data = await MembershipModel.findById(id);
    const link = new LinkModel({
      member: data,
      amount: body.amount,
      application_reason: body.application_reason,
      application_self: body.application_self,
      application_child: body.application_child,
      childs_name: body.childs_name
    })
    const saved = await link.save();
    res.status(201).json(saved);
  }
  catch(error){
    res.status(400).json({message: error.message})
  }
})


// Get all
router.get("/get_members", async (req, res) => {
  try {
    const data = await MembershipModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})


// Get One
router.get("/get_links/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await MembershipModel.findById(id);
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

module.exports = router;