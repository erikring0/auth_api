/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         id:
 *            type: integer
 *            description: The auto-generated id of the user.
 *         firstName:
 *            type: string
 *            description: The first name of the user.
 *         lastName:
 *            type: string
 *            description: The last name of the user.
 *         email:
 *            type: string
 *            description: The email of the user.
 *         password:
 *            type: string
 *            description: The password of the user.
 *         resetToken:
 *            type: integer
 *            description: The token the user needs to reset their password.
 *         resetExp:
 *            type: string
 *            description: The unix timestamp of when the user's reset token expires.
 *         createdAt:
 *            type: string
 *            description: The date the user is created.
 *         updatedAt:
 *            type: string
 *            description: The date any one of the user's database columns are updated.
 * /user:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user by validating email and password.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               firstName: John
 *               lastName: Doe
 *               email: johndoe@gmail.com
 *               password: thebestpassword!
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *
 * /user/login:
 *   post:
 *     summary: Log in a user
 *     description: Logs in a user by generating a JSON Web Token.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *
 * /user/password-reset-input:
 *   post:
 *     summary: Request password reset
 *     description: Sends a password reset email to the user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *
 * /user/reset-password:
 *   post:
 *     summary: Reset password
 *     description: Resets the user's password by validating and hashing the new password.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
const router = require('express').Router();
const ctrl = require('./usersController');
const email = require('../../email/emailController');

router.post(
  '/',
  ctrl.validateEmail,
  ctrl.validatePassword,
  ctrl.isNewUser,
  ctrl.hashPassword,
  ctrl.addUser,
  (req, res) => { res.json({ success: true, message: req.newUser }); },
);

router.post(
  '/login',
  ctrl.findUserByEmail,
  ctrl.comparePassword,
  ctrl.generateJSONToken,
  (req, res) => { res.json({ success: true, message: req.user.token }); },
);

router.post(
  '/password-reset-input',
  ctrl.findUserByEmail,
  email.validateReset,
  email.sendEmail,
  (req, res) => { res.json({ success: true, message: 'Follow the instructions sent to your email.' }); },
);

router.post(
  '/reset-password',
  ctrl.validatePassword,
  ctrl.hashPassword,
  email.resetPassword,
  (req, res) => { res.json({ success: true, message: 'Password is now reset. Please log in.' }); },
);

module.exports = router;
