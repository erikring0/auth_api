function findUseryByEmail(req, res, next) {
  db.models.User.findOne({ where: { email: req.body.email } })
    .then((existingUser) => {
      if (existingUser) {
        req.user = existingUser;
        next();
      } else res.status(401).send('This account does not exist.');
    }).catch((err) => next(err));
}

function generateJSONToken(req, res, next) {

}

function sendEmail(req, res, next) {

}
