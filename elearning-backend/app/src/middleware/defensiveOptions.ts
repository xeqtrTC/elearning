import { Users, RoleUsers } from '../models/index'
import { Request, Response, NextFunction } from 'express'
import { sendResponseFailure } from './responses'
const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    // const checkUser = await Users.findByPk(req.user.id);
    const isAdmin = await RoleUsers.findAll({
        where: {
            userId: 5
        }
    })
    console.log(isAdmin)
    // for (const nameOfRole of isAdmin!) {
    //     if(nameOfRole.name === "admin") {
    //         next()
    //         return;
    //     }
    // }
    return sendResponseFailure(401, 'wrong', res)
}
const defensiveOptions = {
    isAdmin: isAdmin
}

export default defensiveOptions