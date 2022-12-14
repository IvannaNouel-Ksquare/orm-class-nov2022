import * as admin from 'firebase-admin';

export type Role = 'patient' | 'doctor' | 'admin';


//cuanta admin 
//admin@test.com / test1234

interface User {
    uid: string;
    email: string;
    userName: string;
    role: Role;
    isDisabled: boolean;
}

const mapToUser = (user: admin.auth.UserRecord) => {
    const customClaims = user.customClaims || { role: "" } as { role?: string };
    const role = customClaims.role ? customClaims.role : "";
    return {
        uid: user.uid,
        email: user.email,
        userName: user.displayName,
        role,
        isDisable: user.disabled
    }
}

//uid = user id
export const creatUser = async (
    displayName: string,
    email: string,
    password: string,
    role: Role

) => {
    const { uid } = await admin.auth().createUser({
        displayName,
        email,
        password

    })

    await admin.auth().setCustomUserClaims(uid, { role });

    return uid;
}

export const readUser = async (uid: string) => {
    try {
        const user = await admin.auth().getUser(uid);
        return mapToUser(user);

    } catch (error) {
        return null;
    }

}

export const getAllUsers = async () => {
    const listOfUsers = await admin.auth().listUsers(10);
    const users = listOfUsers.users.map(mapToUser);

    return users;
}

export const updateUser = async (uid: string, displayName: string, email: string, password: string) => {
    try {
        const user = await admin.auth().updateUser(uid, {
            displayName,
            email,
            password
        })

        return mapToUser(user);

    } catch (error) {
        return null;

    }
}

export const disableUser = async (uid: string, disabled: boolean) => {
    try {
        const user = await admin.auth().updateUser(uid, {
            disabled
        })
        return {
            isDisabled: user.disabled
        };

    } catch (error) {
        return null;
    }

}