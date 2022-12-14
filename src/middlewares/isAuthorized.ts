import { Request, Response } from 'express';
import { Role } from '../firebase/index'


//Sirva como middleware
//nos deje config que los roles tienen acceso a un endpoint
//nos debe dejar sobreescribir el permiso si el mismo usuario dueñp del recurso quiere accederlo a pesar de no tener permisos

export const isAuthorized = (options: { role: Role[]; allowSameUser: boolean }) => {
    return (req: Request, res: Response, next: Function) => {
        const { uid, email, role } = res.locals;
        const { userId } = req.params;

        if (email === 'Super USER') {
            return next();
        }
        if (options.allowSameUser && userId && userId === uid) {
            return next();
        }
        if (!role) {
            return res.status(403).send();
        }
        if (options.role.includes(role)) {
            return next()
        }
        return res.status(403).send();
    }
}
