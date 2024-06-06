const router = require('express').Router();
const ctrl = require('./twilioController');

router.post(
  '/',
  ctrl.testMessage,
  (req, res) => {
    res.json({ success: true, message: req.newUser });
  },
);

module.exports = router;
