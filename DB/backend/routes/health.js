const express = require('express');

const { MembershipModel, HealthApplicationModel } = require('../models');

const router = express.Router();

const mail = require('../utils/mail');


const SUCCESSFUL_EMAIL = "Dear Sir/Madam,\nYour funding has been approved. You should expect to have your funds transfered to your account within 2 business days.\n\nYours Sincerely,\n Kokatha Admin.";
const FAILED_APPLICATION_EMAIL = "Dear Sir/Madam,\nYou don't have enough funding in your account.\nPlease contact the office for further enquieries to find out when your funds will be reallocated.\nTel (08) 8642 2068 \n\nYours Sincerely,\n Kokatha Admin.";

router.get("/", async (req, res) => {
  try {
    const data = await HealthApplicationModel.find({linked: false});
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
});


router.get("/id/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await HealthApplicationModel.findById(id);
    res.status(200).json(data);
  } catch(err) {
    res.status(400).json({
      message: err.message
    })
  }
});

router.get("/member/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await HealthApplicationModel.find({member: id, linked: true});
    res.status(200).json(data);
  } catch(err) {
    res.status(400).json({
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

    // const link = new HealthApplicationModel({
    //   member: data,
    //   single_name: body.single_name,
    //   member_id: id,
    //   dob: body.dob,
    //   phone: body.phone,
    //   address: body.address,
    //   amount: body.amount,
    //   application_reason: body.application_reason,
    //   application_self: body.application_self,
    //   application_child: body.application_child,
    //   childs_name: body.childs_name
    // })

    // const saved = await link.save();
    res.status(201).json(saved);
  }
  catch(error){
    res.status(400).json({message: error.message})
  }
});


// Create Health Application
router.post('/new/apply/', async (req, res) => {
  const id = req.params.member_id;
  const body = req.body;

  try{
    const data = await MembershipModel.findOne({email: body.email});
    const m_body = {};

    for (var key in body) {
      const value = body[key];
      if (key === "member") continue;
      if (key === "amount") {
        m_body[key] = parseFloat(value);
      } else if (key === "common_holder") {
        m_body[key] = value === "on";
      } else if (key === "self") {
        m_body[key] = value === "on";
      } else if (key === "child") {
        m_body[key] = value === "on";
      } else {
        m_body[key] = value;
      }
    }

    console.log(m_body);

    const link = new HealthApplicationModel({
      member: data,
      ...m_body
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
      const res = mail.sendEmail(member.email, "Kokatha Health Application", 
        FAILED_APPLICATION_EMAIL
      )
      res.status(400).json({
        "message": "Insufficient funds",
        "balance": member.account_balance,
      })
      return
    }

    await HealthApplicationModel.findOneAndUpdate({_id: data._id}, {linked: true});
    await MembershipModel.findOneAndUpdate({_id: member._id}, {account_balance: member.account_balance - data.amount});

    mail.sendEmail(member.email, "Kokatha Health Application", 
      SUCCESSFUL_EMAIL
      )
    res.status(200).json({message: "success"});
  }catch(error) {
    res.status(400).json({message: error.message})
  }
})


router.get("/mail/", async (req, res) => {
  try {
    const res = mail.sendEmail("francismuti2000@gmail.com", "hello", "hello");
    
    res.status(200).json({
      "message": "success",
      "info": res
    })
  } catch(err) {
    res.status(505).json({
      "message": "fail",
      "info": err
    })
  }
})

module.exports = router;