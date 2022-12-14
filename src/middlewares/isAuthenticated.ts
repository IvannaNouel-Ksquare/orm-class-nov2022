import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import jwt from "jsonwebtoken";

export const isAuthenticated =async (
        req: Request,
        res: Response,
        next: Function
) => {
    //no authorization header
    const {authorization} = req.headers;
    
    if(!authorization){
        return res.status(401).send({error: "No auth"})
    }
    //no correct shema
    if(!authorization.startsWith("Bearer")){
        return res.status(401).send({error: 'no auth'})
    }
    //check if the token is valid

    const splittedToken = authorization.split('Bearer');
    if(splittedToken.length !== 2){
        return res.status(401).send({error: 'no auth'})
    }

    const token = splittedToken[1];

    try {
        const decodedtoken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
        res.locals= {
            ...res.locals,
            email: decodedtoken.email,
            uid: decodedtoken.uid,
            role: decodedtoken.role
        }

        //detecto que mi token fuese valido y ahora puede tener acceso a la información
        return next();
    } catch (error) {
        return  res.status(401).send({error: 'no auth'})
    }
}