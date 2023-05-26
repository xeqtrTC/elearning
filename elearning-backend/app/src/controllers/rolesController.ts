import { Role } from '../models/index';
import { Request, Response } from 'express';
import { roleAttributes } from '../models/role.model';
import { sendResponseFailure } from '../middleware/responses';

export const addNewRole = async (req: Request, res: Response) => {
    const { addRoleName, id }: { addRoleName: string, id?: number } = req.body;
    if (!addRoleName) {
        return sendResponseFailure(401, 'There isnt any credential provided', res)
    }
    const addRole: roleAttributes = {
        name: addRoleName,
    }
    try {
        await Role.create(addRole)
        return res.status(201).json({ message: "New role added"})
    } catch (error: any) {
        console.log(error)
        return res.status(401).json({ message: error.message})
    }
}

export const removeRole = async (req: Request, res: Response) => {
    const { id }: { id: number } = req.body;
    try {
        const findRole = await Role.findOne({
            where: {
                id: id
            }
        })
        if (findRole) {
            await findRole.destroy();
            return res.status(201).json({ message: "Deleted role"})
        }
        return res.status(401).json({ message: "That role doesn't exist"})
    } catch (error: any) {
        return res.status(401).json({ message: error.message })
    }
}

export const updateRoleName = async (req: Request, res: Response) => {
    const { id, name }: { id: number, name: string } = req.body;

    try {
        await Role.update({
            name: name
        },
        {
            where: {
                id: id
            }
        }
        )
        return res.status(201).json({ message: 'Role updated'})
    } catch (error: any) {
        return res.status(401).json({ message: error.message })
    }
}
