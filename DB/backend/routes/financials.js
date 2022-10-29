const express = require('express');

const { FinanceModel, MembershipModel, HealthApplicationModel } = require('../models');

const router = express.Router();

router.get("/transactions", async (req, res) => {
  try {
    const data = await FinanceModel.find();
    res.status(200).json(data);
  } catch(err) {
    res.status(500).json({
      "message": "failed",
      "err": err
    })
  }
})

router.post("/fund", async (req, res) => {
  try {
    const data = new FinanceModel({
      amount: req.body.amount,
      type: "MONEY_IN",
      comment: "Upload"
    });
    await data.save();
    res.status(201).json({
      "message": "update",
      "data": data
    });
  } catch(err) {
    res.status(500).json({
      "message": "failed",
      "error": err
    });
  }
})

router.get("/stats", async (req, res) => {

  try {
    const balance = await FinanceModel.aggregate([
      {
        $match: {
          type: "MONEY_IN"
        }
      },
      {
        $group: {
          _id: null,
          amount: { $sum: "$amount" }
        }
      }
    ])

    const allocated = await MembershipModel.aggregate([
      {
        $group: {
          _id: null,
          amount: { $sum: "$account_balance" }
        }
      }
    ])

    const used = await HealthApplicationModel.aggregate([
      {
        $match: {
          linked: true
        }
      },
      {
        $group: {
          _id: null,
          amount: { $sum: "$amount" }
        }
      }
    ]);

    const result = {
      balance: balance[0]["amount"] - allocated[0]["amount"],
      allocated: allocated[0]["amount"],
      linked: used[0]["amount"]
    }

    res.status(200).json(result);
  } catch(err) {
    res.status(500).json({
      "message": "failed",
      "data": err
    })
  }
})

module.exports = router;