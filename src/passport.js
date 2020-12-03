import passport from 'passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import jwt from "jsonwebtoken";
import {User} from './models';

const jwtSecret = process.env.JWT_SECRET || 'secret';

export const generateToken = (id) => jwt.sign({id}, jwtSecret);

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
};

const verifyUser = async (jwt_payload, done) => {
    const {id} = jwt_payload;
    try {
        const logInUser = await User.findByPk(id);
        if (logInUser) {
            return done(null, logInUser);
        } else {
            return done(null, false);
        }
    }
    catch(err) {
        done(err, false);
    }
}

passport.use(new Strategy(jwtOpts, verifyUser));
passport.initialize();

export const authenticateReq = (req, res, next) =>
    passport.authenticate("jwt", { sessions: false }, (error, user) => {
        if (user) {
            req.user = user;
        }
        next();
    })(req, res, next);

