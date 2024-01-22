import { Router } from "express";
import userModel from "../daos/models/user.model.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router();

//Register
router.post("/register", passport.authenticate('register', {
  failureRedirect: 'api/sessions/fail-register'
}), async (req, res) => {
  res.send({
    status: "success",
    message: "Usuario creado con extito con ID: " + res.id,
  });
});

//login
router.post("/login", passport.authenticate('login', {
  failureRedirect: 'api/sessions/fail-login'
}), async (req, res) => {
  const user = req.user

  req.session.user = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    age: user.age
  }

  res.redirect('/products');
});

router.get("/fail-register", (req, res) => {
  res.status(401).send({error: "Failed to process register"})
})

router.get("/fail-login", (req, res) => {
  res.status(401).send({error: "Failed to process login"})
})

//Github
router.get("/github", passport.authenticate('github', {scope: ['user: email']}),
async (req, res) => {
   res.render("gitHubLogin", {
    title: "GitHubLogin",
    fileCss: "styles.css",
  });
})

router.get("/githubcallback",  passport.authenticate('github', {failureRedirect: 'github/error'} ), async (req, res) =>
{
  const user = req.user
  req.session.user = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    age: user.age}

    req.session.admin = true
    res.redirect("/products")
})


export default router;