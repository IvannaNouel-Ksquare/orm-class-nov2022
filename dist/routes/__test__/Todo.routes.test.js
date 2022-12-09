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
const app_1 = __importDefault(require("../../app")); //express
const models_1 = require("../../models"); //iniciar la base
const supertest_1 = __importDefault(require("supertest"));
const ConfigDBs_1 = __importDefault(require("../../models/ConfigDBs"));
describe('Todo routes', () => {
    let testDB; //la base de datos
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        testDB = (0, models_1.startSequelize)(ConfigDBs_1.default.test.database, ConfigDBs_1.default.test.passwd, ConfigDBs_1.default.test.host, ConfigDBs_1.default.test.username);
        yield testDB.sync({ force: true });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testDB.close();
    }));
    it('[POST] /todos - should return 201 after its creation', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/todos')
            .send({ description: 'Unit testinf with Jest and Supertest ;)' });
        console.log(res.body);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
            id: 1,
            description: 'Unit testinf with Jest and Supertest ;)'
        });
    }));
    it('[POST] /todos -should return 400 after receinving incorrect body', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/todos')
            .send({});
        expect(res.statusCode).toEqual(400);
    }));
    it('[GET] /todos  should return 400 after receiving a correct id', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get('/todos/1')
            .send({});
        expect(res.body).toEqual({
            id: 1,
            description: 'Unit testinf with Jest and Supertest ;)'
        });
    }));
});
