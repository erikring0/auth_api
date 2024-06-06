const router = require('express').Router();
const ctrl = require('./emailController');

router.post(
  '/',
  (req, res) => {
    res.json({ success: true, token: req.newUser });
  },
);

module.exports = router;
