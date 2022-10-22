const express = require('express');

const { MembershipModel, HealthApplicationModel } = require('../models');

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await HealthApplicationModel.find({linked: false});
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})


// Create Health Application
router.post('/apply/:member_id', async (req, res) => {
  const id = req.params.member_id;
  const body = req.body;

  try{
    const data = await MembershipModel.findOne({member_id: id});

    const link = new HealthApplicationModel({
      member: data,
      single_name: body.single_name,
      member_id: id,
      dob: body.dob,
      phone: body.phone,
      address: body.address,
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
});


router.put("/link/:application_id", async (req, res) => {
  const id = req.params.application_id;
  
  try{
    const data = await HealthApplicationModel.findById(id);
    console.log(data);
    const member = await MembershipModel.findById(data.member);

    console.log(member);

    if (member.account_balance < data.amount) {
      res.status(400).json({
        "message": "Insufficient funds",
        "balance": member.account_balance,
      })
      return
    }

    await HealthApplicationModel.findOneAndUpdate({_id: data._id}, {linked: true});
    await MembershipModel.findOneAndUpdate({_id: member._id}, {account_balance: member.account_balance - data.amount});

    res.status(200).json({message: "success"});
  }catch(error) {
    res.status(400).json({message: error.message})
  }
})

module.exports = router;