import dotenv from 'dotenv';
import { startSequelize  } from './models';
import app from './app';

dotenv.config();
const PORT = process.env.PORT;
const DB_PASS = <string>process.env.DB_PASS;
const DB_USER = <string>process.env.DB_USER;
const DB_NAME = <string>process.env.DB_NAME;
const DB_HOSTNAME = <string>process.env.DB_HOSTNAME;

console.log(DB_PASS);
console.log(typeof DB_PASS);

app.listen(PORT, async () => {
    try {
        const sequelize = startSequelize(DB_NAME, DB_PASS, DB_HOSTNAME, DB_USER);
        await sequelize.sync();
        console.info('DB and Express server is up and running!!!!')
    } catch (error) {
        console.error(error);
        process.abort();
    }
})