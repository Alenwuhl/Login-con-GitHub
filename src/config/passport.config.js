import passport from "passport";
import passportLocal from "passport-local";
import GithubStrategy from "passport-github2";
import userModel from "../daos/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = passportLocal.Strategy;

const initializePassport = () => {
  // Configuración de autenticación GitHub
  passport.use(
    new GithubStrategy(
      {
        clientID: "Iv1.f975b3ffd27b514b",
        clientSecret: "36d0ae6fbd6824aea898af45d59fbe753bbdecbe",
        callbackURL: "http://localhost:5000/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log("Perfil obtenido de GitHub:", profile);

          // Buscar si el usuario ya existe en la base de datos
          let user = await userModel.findOne({ email: profile._json.email });

          // Si el usuario no existe, crea uno nuevo
          if (!user) {
            console.warn(
              "Usuario no existe con el correo electrónico:",
              profile._json.email
            );

            let newUser = {
              first_name: profile._json.email || displayName,
              last_name: "",
              age: 20,
              email: profile._json.email,
              password: "",
              loggedBy: "GitHub",
            };

            user = await userModel.create(newUser);
          }
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

// Estrategia de registro
passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      // Lógica de registro
    }
  )
);

// Estrategia de inicio de sesión
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      // Lógica de inicio de sesión
    }
  )
);

// Serialización y deserialización de usuarios
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default initializePassport;
