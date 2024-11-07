const express = require("express");
const { authMiddleware } = require("./middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (req,res) => {
    const id = req.userId;

    const balance = await Account.findOne({
        userId: id
    });

    res.status(200).json({
        balance: balance.balance
    });
});

router.post("/transfer", authMiddleware, async (req,res) => {

    const session = await mongoose.startSession()

    session.startTransaction()
    const sender = req.userId;
    const amountToBeSent = req.body.amount;
    const receiver = req.body.to;
  
    const exists = await Account.findOne({
        userId: receiver
    });

    if (!exists) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid Account"
        });
    }

    const Sender = await Account.findOne({
        userId: sender
    });

    const senderBalance = Sender.balance;

    if (amountToBeSent > senderBalance) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    await Account.findOneAndUpdate(
        {userId: req.userId},
        {$inc: {balance: -amountToBeSent}}
    );

    await Account.findOneAndUpdate(
        {userId: receiver},
        {$inc: {balance: +amountToBeSent}}
    )

    await session.commitTransaction();

    res.status(200).json({
        message: "Transfer successful"
    })

});




module.exports = router;