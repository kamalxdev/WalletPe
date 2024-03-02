
const express = require('express');
const router = express.Router();
const zod = require("zod");
const USER = require('../../models/user');
const ACCOUNT= require('../../models/account');
const JWT = require('jsonwebtoken');
const AuthorizeLoginedUser = require('../../middleware/AuthorizeLoginedUser');



const SignUpSchema = zod.object({
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string(),
    email: zod.string().email()
})



const SignInSchema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
})





router.post('/signin', async (req, res) => {
    const { body } = req;
    // console.log(body);
    const result = SignInSchema.safeParse(body);

    if (!result.success) {
        const AuthError = (result.error.errors).map((error) => {
            return {
                field: error.path.join(""),
                message: error.message
            }
        });
        return res.status(400).json({ message: "Invalid Input", AuthError });
    }
    const checkUser = await USER.findOne({ email: body.email });
    if (checkUser) {
        if (checkUser.password === body.password) {
            const userToken = JWT.sign({ userID: checkUser._id, userEmail: checkUser.email }, process.env.JWT_SECRET);
            res.setHeader('authorization', `Bearer ${userToken}`);
            return res.status(200).json({ message: "User signed in", userToken });
        }
    }
    return res.status(400).json({ message: "User doesn't exists" });
});






router.post('/signup', async (req, res) => {
    const { body } = req;

    const result = SignUpSchema.safeParse(body);

    if (!result.success) {
        const AuthError = (result.error.errors).map((error) => {
            return {
                field: error.path.join(""),
                message: error.message
            }
        });
        return res.status(400).json({status:400 , message: "Invalid Input", AuthError });
    }
    const checkUser = await USER.findOne({ email: body.email });

    if (checkUser) {
        return res.status(400).json({status:400 , message: "User already exists" });
    }
    const newUser = await USER.create(body);
    if (newUser) {
        await ACCOUNT.create({ user: newUser._id, balance: 1+ Math.random()*10000 });
        return res.status(200).json({ status:200 ,message: "User registered succefully", userID: newUser._id });
    }
});





router.put('/', AuthorizeLoginedUser, async (req, res) => {
    const { body } = req;

    const result = SignUpSchema.safeParse(body);

    if (!result.success) {
        const AuthError = (result.error.errors).map((error) => {
            return {
                field: error.path.join(""),
                message: error.message
            }
        });
        return res.status(400).json({ message: "Invalid Input", AuthError });
    }
    const user = await USER.findOneAndUpdate({ _id: req.userID }, body);
    if (user) {
        return res.status(200).json({ message: "User updated successfully", userID: user._id });
    }
});

router.get('/bulk', AuthorizeLoginedUser, (req, res) => {
    const filter = req.query.filter || "";
    const users = USER.find({
        $or: [
            { firstname: { $regex: filter } },
            { lastname: { $regex: filter } },
            { email: { $regex: filter } }
        ]
    }); 
    if (users) {
        return res.status(200).json({ message: "All users", users:users.filter((user) => { return { email: user.email, firstname: user.firstname, lastname: user.lastname } }) });
    }
})




module.exports = router;