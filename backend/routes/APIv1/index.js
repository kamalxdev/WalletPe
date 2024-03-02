

const express = require("express");

const router = express.Router();



router.get('/test', (req, res) => {
    res.send('Hello World');
});

router.use('/user', require('./user'));
router.use('/account', require('./account'));



module.exports = router;