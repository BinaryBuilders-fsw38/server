const passport = require('passport')
const {Strategy} = require('passport-jwt')
const query = require('../model/query')

const jwtSecret = "kode rahasia"
const option = {
    jwtFromRequest : (req) => {
        return req.cookies.authorization
    },
    secretOrKey : jwtSecret
}

    passport.use(
        new Strategy(option, async (payload, done) => {
            
            const user = await query.select('user', {user_id: payload.id})
            if (user.length > 0) {
                return done(null, user)
            }else{
                return done(null, false)
            }
        })
    );

    const authenticate = passport.authenticate("jwt", { session: false });

    module.exports = { passport, authenticate };