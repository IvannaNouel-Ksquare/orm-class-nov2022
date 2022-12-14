import { Router, Request, Response } from "express";
import { creatUser, disableUser, getAllUsers, readUser, updateUser } from "../firebase";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized";

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

    if (disabled === undefined || typeof disabled !== 'boolean') {
        return res.status(400).send({
            error: 'invalid data'
        })
    }

    try {
        const user = await disableUser(uid, disabled);
        if (!user) {
            return res.status(400).send({
                error: "invalid id"
            })
        }
        res.status(200).send(user)

    } catch (error) {
        res.status(500).send({ error: 'something went wrong' });

    }

})

UserRouter.put('/update/:uid', async (req: Request, res: Response) => {

    let uid = req.params.uid;
    const { displayName, email, password } = req.body;

    try {
        const updatedUser = await updateUser(uid, displayName, email, password);
        if (!updatedUser) {
            return res.status(400).send({
                error: "invalid id"
            })
        }
        res.status(201).send({
            updatedUser
        })

    } catch (error) {
        res.status(500).send({ error: 'something went wrong' });
    }
})

UserRouter.get('/', async (_req: Request, res: Response) => {

    try {
        const users = await getAllUsers();
        res.status(202).send({
            users
        })

    }
    catch (error) {
        res.status(500).send({ error: 'something went wrong' });
    }
})



UserRouter.get('/:uid', isAuthenticated, isAuthorized ({role: ['admin'], allowSameUser:true}),async (req: Request, res: Response) => {

    let uid = req.params.uid;

    try {
        const user = await readUser(uid);
        if (!user) {
            return res.status(400).send({
                error: "invalid id"
            })
        }
        res.status(202).send({
            user
        })

    }
    catch (error) {
        res.status(500).send({ error: 'something went wrong' });
    }
})

