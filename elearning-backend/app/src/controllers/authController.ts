import { Role, EmailSubscription, sequelize, RoleUsers} from '../models/index';
import { Request, Response, NextFunction } from 'express'
import { Users, UsersAttributes } from '../models/user.model'
// const Op = db.Sequelize.Op;
import status from 'http-status';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { sendMailUponRegister} from '../nodemailer/emailSender';
import { sendResponseFailure, sendResponseSuccess } from '../middleware/responses';
import { Optional } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/types/utils';
import { RoleUsersAttributes } from '../models/role.model';

export const signUp = async (req: Request, res: Response) => {
    const { password, username, email, roles }: {password: string, username: string, email: string, roles: string} = req.body
    if (!password || !username || !email) {
        return sendResponseFailure(401, 'You need to provide credentials', res)
    }
    const hashedPassword: string = bcrypt.hashSync(password, 10)
    const tokenToBeAdded: string = v4();
    const userToAdd: UsersAttributes = {
        username: username,
        email: email,
        password: hashedPassword,
        verificationToken: tokenToBeAdded,
        isVerificated: false
    }
    try {
        const createdUser = await Users.create(userToAdd)        
        if (req.body.roles) {
            const rolesOfUser =  await Role.findOne({
                where: {
                    name: roles
                }
            })
            const addUserToRole: RoleUsersAttributes  = {
                userId: createdUser!.id,
                roleId: rolesOfUser!.id,
            }
            await RoleUsers.create(addUserToRole)
            sendMailUponRegister(email, tokenToBeAdded)
            return res.status(200).json({ message: 'You have added'})
        } else {
            const searchRoleUser = await Role.findOne({
                where: {
                    name: 'User'
                }
            })
            if(!searchRoleUser) {
                return sendResponseFailure(401, 'There isnt any role', res)
            }
            await RoleUsers.create({
                roleId: searchRoleUser!.id,
                userId: createdUser.id
            })
            sendMailUponRegister(email, tokenToBeAdded)
            return res.status(status.OK).json({ message: "You have added"})
        }
    } catch (error: any) {
        console.log(error);
        return res.status(401).json({ message: error.message })
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    passport.authenticate('local', async (error: any, user: any, info: any) => {
      try {
        console.log(user, info, error);
        if (error) return;

        if (info) {
            return res.status(401).json(info)
        }
        const findUser = await Users.findOne({
          where: {
            username: user.username, 
          },
          attributes: ['username', 'email'],
          include: [
            {
              model: Role,
              attributes: ['name'],
              through: { attributes: [] },
            },
          ],
        });
        if (!findUser) {
          return sendResponseFailure(401, 'That user doesnt exist', res);
        }
        const infoAboutUser = {
          findUser,
        };
        req.logIn(user, (error) => {
          if (error) {
            throw error;
          }
          return res.status(200).json(infoAboutUser);
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  };

export const logoutUser = async (req: Request, res: Response) => {
    req.logout((error) => {
        if(error) {
            return res.status(401).json({ message: error.message || 'Something went wrong on logout!'})
        }
        req.session.destroy((error) => {
            if(error) {
                console.log(error)
            } else {
                console.log('destroyed')
            }
        } );
        res.clearCookie('connect.sid');
        return res.status(200).json({ message: "You have logouted"})
    })
}

export const whoAmI = async (req: Request, res: Response) => {
    return res.status(201).json(req.user)
}

export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const allRoles = await Role.findAll();
        return res.status(200).json(allRoles);
    } catch (error: any) {
        return res.status(401).json({ message: error.message })
    }
}

export const verifyAccountByToken = async (req: Request, res: Response) => {
    const token = req?.params?.token
    try {
        if (token) {
            const userWithToken = await Users.findOne({
                where: {
                    verificationToken: token
                }
            })
            if (!userWithToken) return sendResponseFailure(404, "That token doesn't exist", res)

            if (userWithToken.isVerificated === true) {
                return sendResponseFailure(401, 'You are already verificated', res)
            } else {
                userWithToken.isVerificated = true;
                userWithToken.verificationToken = null
                await userWithToken.save();
                return sendResponseSuccess(200, "You verificated, redirecting...", res)
            }       
        } else {
            return sendResponseFailure(404, "There isn't any token", res)
        }
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res)
    }
}
