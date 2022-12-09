"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const models_1 = require("./models");
const app_1 = __importDefault(require("./app"));
const ConfigDBs_1 = __importDefault(require("./models/ConfigDBs"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const envRunning = process.env.ENVIRONMENT === 'testing' ? ConfigDBs_1.default.test : ConfigDBs_1.default.dev;
const DB_PASS = process.env.DB_PASS;
const DB_USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;
const DB_HOSTNAME = process.env.DB_HOSTNAME;
console.log(DB_PASS);
console.log(typeof DB_PASS);
app_1.default.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sequelize = (0, models_1.startSequelize)(ConfigDBs_1.default.test.database, ConfigDBs_1.default.test.passwd, ConfigDBs_1.default.test.host, ConfigDBs_1.default.test.username);
        /*  va a borrar la tabla y la va a volver a crear vacia para que ninguna
         prueba anterior afecte nuestros test, por eso es mejor que este vacia con esto */
        yield sequelize.sync({ force: true });
        console.info('DB and Express server is up and running!!!!');
    }
    catch (error) {
        console.error(error);
        process.abort();
    }
}));
