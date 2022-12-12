import dotenv from 'dotenv';
dotenv.config();
import { startSequelize } from './models';
import * as admin from 'firebase-admin';
import app from './app';
import envs from './models/ConfigDBs'
const PORT = process.env.PORT;


admin.initializeApp();

const envRunning = process.env.ENVIRONMENT === 'testing'? envs.test :envs.dev;

const DB_PASS = <string>process.env.DB_PASS;
const DB_USER = <string>process.env.DB_USER;
const DB_NAME = <string>process.env.DB_NAME;
const DB_HOSTNAME = <string>process.env.DB_HOSTNAME;


console.log(DB_PASS);
console.log(typeof DB_PASS);

app.listen(PORT, async () => {
    try {
        const sequelize = startSequelize(envs.test.database, envs.test.passwd, envs.test.host, envs.test.username);
        /*  va a borrar la tabla y la va a volver a crear vacia para que ninguna
         prueba anterior afecte nuestros test, por eso es mejor que este vacia con esto */
        await sequelize.sync({ force: true });
        console.info('DB and Express server is up and running!!!!')
    } catch (error) {
        console.error(error);
        process.abort();
    }
})