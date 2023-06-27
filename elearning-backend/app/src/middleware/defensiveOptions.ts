import { Users, RoleUsers, Role } from '../models/index'
import { Request, Response, NextFunction } from 'express'
import { sendResponseFailure } from './responses'

const isUserAnAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const adminId = await Role.findOne({
        where: {
            name: 'Admin'
        }
    })
    if (adminId) {
        const isAdmin = await RoleUsers.findOne({
            where: {
                userId: req.user?.id,
                roleId: adminId?.id
            }
        })
        console.log(isAdmin);
        if (isAdmin === null) {
            return sendResponseFailure(401, 'Not allowed', res)
        }
        next();   
    }
    return sendResponseFailure(401, 'Not allowed', res)
}

const defensiveOptions = {
    isUserAnAdmin: isUserAnAdmin
}

export default defensiveOptions