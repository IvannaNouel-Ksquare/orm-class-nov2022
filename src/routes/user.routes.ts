import { Router, Request, Response } from "express";
import { creatUser, disableUser, getAllUsers, readUser, updateUser } from "../firebase";

export const UserRouter = Router();


//endpoint para crear usuarios
UserRouter.post('/newUser', async (req: Request, res: Response) => {
    //info desde el body
    //checar si falta info
    //checar que el rol sea adecuado

    const { displayName, email, password } = req.body;

    if (!displayName || !email || !password) {
        return res.status(400).send({
            error: 'missing data'
        })
    }

    try {
        const userId = await creatUser(displayName, email, password, 'patient');
        res.status(201).send({
            userId
        })

    } catch (error) {
        res.status(500).send({ error: 'something went wrong' });
        console.log(error);

    }
})

UserRouter.put('/disable/:uid', async (req: Request, res: Response) => {

    let uid = req.params.uid;
    const { disabled } = req.body;

    if (!uid) {
        return res.status(400).send({
            error: 'not a valid id'
        })
    }
    try {
        const disable = await disableUser(uid, disabled);
        if (disable === undefined || typeof disable !== 'boolean') {
            return res.status(400).send({
                error: 'invalid data'
            })

        }
        res.status(200).send({
            disable
        })

    } catch (error) {
        res.status(500).send({ error: 'something went wrong' });

    }

})