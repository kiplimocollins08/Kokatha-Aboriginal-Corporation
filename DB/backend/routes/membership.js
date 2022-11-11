const express = require('express');
const fs = require("fs");
const path = require("path");

const csv = require("csvtojson");

const { parse } = require("csv-parse");

const { MembershipModel, LinkModel } = require('../models');

const router = express.Router();


function isNumeric(str) {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}

router.get("/", async (req, res) => {
  try {
    const data = await MembershipModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

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

router.put("/update/id/:member_id", async (req, res) => {
  const id = req.params.member_id;
  const data = req.body;

  console.log(`Updating ${id}`);
  console.log(data);

  try {
    await MembershipModel.updateOne({_id: id}, {$set: {name: data.name, ...data}});
    res.status(200).json({
      "message": ""
    })
  } catch(err) {
    res.status(500).json({
      "message": "failed to update",
      "err": err
    })
  }
});

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


router.put("/fund/:member_id", async (req, res) => {
  const m_id = req.params.member_id;
  const body = req.body;
  console.log(body)
  if (!body.amount || isNumeric(body.amount)) {
    res.status(400).json({
      "message": "invalid request. bad amount",
    })
    return
  }

  try {
    await MembershipModel.updateMany(
      {member_id: m_id},
      {
        $inc: {
          account_balance: body.amount
        }
      }
    ).orFail().then(async () => {
      await MembershipModel.updateMany({}, { $min: { account_balance: 1000 }});
      console.log("Done Updating");
    });

    const member_new = await MembershipModel.findOne({member_id: m_id}).orFail();
    res.status(200).json({
      "message": "success",
      "body": member_new
    });

  }catch(err) {
    res.status(400).json({
      "message": "no such member",
      "err": err.message
    })
  }
})


router.put("/fund/", async (req, res) => {
  const body = req.body;
  if (!body.amount || isNumeric(body.amount)) {
    res.status(400).json({
      "message": "invalid request. bad amount",
    })
    return
  }

  await MembershipModel.updateMany(
    {},
    {
      $inc: {
        account_balance: body.amount
      }
    }
  ).orFail().then(async () => {
    await MembershipModel.updateMany({}, { $min: { account_balance: 1000 }});
    console.log("Done Updating");
  });

  res.status(200).json({
    "message": "success"
  })

})


router.post("/upload", async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  const members_file = req.files.members;


  const file_path = path.resolve("extras/members.csv");
  console.log(file_path);

  await members_file.mv(file_path, async (err) => {
    if (err) {
      return res.status(500).send({
        "messaged": "failed",
        "info": err
      })
    }

    csv({
      noHeader: false,
      output: "json"
    })
      .fromFile(file_path)
      .then(async (data) => {
        for (let i = 0; i < data.length; i++) {
          const obj = data[i];

          const member = new MembershipModel({...obj});

          try {
            const saved = await member.save();
            console.log("Success");
            console.log(saved);
          } catch(err) {
            console.log("Failed");
            console.log(err);
          }

          console.log(obj);
        }
      })


    res.status(201).json({
      "message": "success"
    })
  })
});


router.delete("/delete/:member_id", async (req, res) => {
  const id = req.params.member_id;
  try {
    await MembershipModel.findByIdAndDelete(id);
    res.status(200).json({
      "message": "deleted"
    });
  } catch(err) {
    res.status(400).json({message: err.message});
  }
});




module.exports = router