
const express = require('express');
const AuthorizeLoginedUser = require('../../middleware/AuthorizeLoginedUser');
const router = express.Router();
const ACCOUNT = require('../../models/account');
const { default: mongoose } = require('mongoose');

router.get('/balance',AuthorizeLoginedUser, async (req, res) => {
    const account = await ACCOUNT.findOne({ user: req.user });
    res.json({ balance: account.balance });
});


router.post('/transfer',AuthorizeLoginedUser, async (req, res) => {
    const session = await mongoose.startSession();
    
    // starting transaction
    session.startTransaction();

    const { to, amount } = req.body;

    // checks to validate amount and account
    const account = await ACCOUNT.findOne({ user: req.user }).session(session);

    if (!account||account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({ message: "Insufficient balance" });
    }

    const toAccount = await ACCOUNT.findOne({ user: to }).session(session);
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({ message: "Invalid account" });
    }



    // transfering amount
    await ACCOUNT.updateOne({ user: req.user }, { $inc: { balance: -amount } }).session(session);
    await ACCOUNT.updateOne({ user: to }, { $inc: { balance: amount } }).session(session);




    // commiting transaction
    await session.commitTransaction();
    return res.json({ message: "Transfer successful" });
});

module.exports = router;