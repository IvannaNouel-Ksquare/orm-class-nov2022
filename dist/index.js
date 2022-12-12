"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const admin = __importStar(require("firebase-admin"));
const app_1 = __importDefault(require("./app"));
const ConfigDBs_1 = __importDefault(require("./models/ConfigDBs"));
const PORT = process.env.PORT;
admin.initializeApp();
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
