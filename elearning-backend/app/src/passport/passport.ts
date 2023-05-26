import express from 'express';
import passport from 'passport';
import session from 'express-session';
import bcrypt from 'bcrypt';
// import db from '../models/';
// import { Sequelize } from '../models/';
// const User = db.users
// const Roles = db.roles
import { Strategy as LocalStrategy } from 'passport-local'
import { Role, RoleUsers, Users } from '../models/index'
import { UsersAttributes, UsersAttributesPassport } from '../models/user.model';

passport.use(new LocalStrategy(async (username, password, done) => {
    const findUser = await Users.findOne({
        where: {
            username: username
        }
    })
    if (findUser?.isVerificated === false) {
        return done(null, false, { message: 'You need to verificate your account!'})
    } else if (findUser?.isVerificated === true) {
        const comparePassword = bcrypt.compareSync(password, findUser.password);
        console.log('ovde sam u compare')
        comparePassword ? (
            console.log(findUser),
            done(null, findUser)
        ) : (
            done(null, false, { message: 'Not valid'})
        )
    } else {
        return done(null, false, { message: 'Something went wrong!'})
    }
}))

passport.serializeUser((user: UsersAttributesPassport, done) => {
    // console.log(user, 'user');
    // console.log('USER BRE', user)
    done(null, user.id)
});

passport.deserializeUser( async (id, done) => {
    const findUser = await Users.findOne({
        where: {
            id: id as number
        },
        attributes: ['id', 'username', 'email'],
        include: [
            {
                model: Role,
                attributes: ['id', 'name'],
               
            },
            
        ]
    })
    return done(null, findUser)
})