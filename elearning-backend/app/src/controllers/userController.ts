import { Role, Users, RoleUsers, sequelize } from '../models/index'
import Sequelize from 'sequelize'
import { NotIn } from 'sequelize-typescript'
import { Request, Response } from 'express'
import { sendResponseSuccess, sendResponseFailure } from '../middleware/responses'
import { UsersAttributes } from '../models/user.model'
import { roleAttributes } from '../models/role.model'
import { Op } from 'sequelize'

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const findUsers: UsersAttributes[] = await Users.findAll({
            attributes: ['id', 'username', 'email'],
            include: [
                {
                    model: Role,
                    attributes: ['name', 'id'],
                },
                
            ]
        })
        return sendResponseSuccess(200, findUsers, res)
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res)
    }

}

export const findOneUser = async (req: Request, res: Response) => {
        const id = req.params.id;
    try {       
        const userInfo = await Users.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: Role, through: { attributes: []}
                }
            ]
        })
        const findRoles: roleAttributes[] = await Role.findAll({
            where: {
                id: id
            }
        })
        const mappedroles = findRoles.map((item) => item.id)
        const roleToBeAdded = await Role.findAll({
            where: {
                id: {
                    NotIn: mappedroles
                }
            }
        });
        const rolesNotBelongingToUser = await Role.findAll({
            where: {
              id: {
                [Op.notIn]: sequelize.literal(
                    `(SELECT \`role_id\` FROM \`RoleOfUsers\` WHERE \`user_id\` = ${mappedroles})`
                    )
              }
            }
          });     
          if (userInfo && roleToBeAdded) {
              const combinedArrays = {
                id: userInfo.id,
                username: userInfo.username,
                email: userInfo.email,
                isVerificated: userInfo.isVerificated,
                rolesThatBelong: userInfo.usersRole,
                rolesToBeAdded: rolesNotBelongingToUser
            }
            return sendResponseSuccess(200, combinedArrays, res)
          }
          return sendResponseFailure(404, "User or roles doesn't exist!", res)
    } catch (error: any) {
        console.log(error);
        return sendResponseFailure(401, error.message, res)
    }
}

export const addRoleToUser = async (req: Request, res: Response) => {
    const { idOfUser, idOfRole } = req.body;
    try {
        const findUser: UsersAttributes | null = await Users.findOne({
            where: {
                id: idOfUser
            }
        })
        const findRole: roleAttributes | null = await Role.findOne({
            where: {
                id: idOfRole
            }
        })
        if (!findRole || !findUser) {
            return sendResponseFailure(401, "Role or user do not exist!", res);
        }
        await RoleUsers.create({
            roleId: findRole.id!,
            userId: findUser.id!
        });
        return sendResponseSuccess(200, "You added role to user", res);
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res);
    }
}

export const removeRoleFromUser = async (req: Request, res: Response) => {
    const { idOfUser, idOfRole } = req.body;
    try {
        const userWithRole = await RoleUsers.findOne({
            where: {
                userId: idOfUser,
                roleId: idOfRole
            }
        })

        if (!userWithRole) {
            return sendResponseFailure(401, "Role or user do not exist!", res);
        }
        userWithRole.destroy();
        return sendResponseSuccess(200, "You removed role to user", res);
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res);
    }
}

export const editUserProfile = async (req: Request, res: Response) => {
    const { username, id, email, verificated } = req.body;

    try {
        const userForUpdate = await Users.findOne({
            where: {
                id: id
            }
        })
        if (userForUpdate!.username === username || userForUpdate!.email === email) {
            return sendResponseFailure(401, "You provided with same username or email!", res)
        }
        if (userForUpdate!.username !== username) {
            const checkUsername = await Users.findOne({
                where: {
                    username: username
                }
            })
            if (checkUsername) {
                return sendResponseFailure(401, 'With that username user already exists!', res)
            } 
        }
        if (userForUpdate!.email !== email) {
            const checkForEmail = await Users.findOne({
                where: {
                    email: email
                }
            })
            if (checkForEmail) {
                return sendResponseFailure(401, 'With that email user already exists!', res)
            }
        }
        if (userForUpdate) {
            userForUpdate.username = username
            userForUpdate.email = email,
            await userForUpdate.save();
            return sendResponseSuccess(200, "You edited this user", res)
        }

        return sendResponseFailure(401, "User doesn't exist", res)
        
    } catch (error: any) {
        return sendResponseFailure(401, error.message, res)
    }

}
