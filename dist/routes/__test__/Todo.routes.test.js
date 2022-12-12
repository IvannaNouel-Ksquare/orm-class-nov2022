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
        // await  createTodo('Test for GET')
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testDB.close();
    }));
    //posts tests
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
    //get tests
    it('[GET] /todos - should return 200 when id is found and return the description ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get('/todos/1')
            .send({});
        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual(1);
        expect(res.body).toHaveProperty('id', 1);
        expect(res.body).toHaveProperty('description', 'Unit testinf with Jest and Supertest ;)');
        expect(res.body).toEqual({
            id: 1,
            description: 'Unit testinf with Jest and Supertest ;)',
            is_completed: true
        });
    }));
    it('[GET] /todos - should return 400 if the id is not valid ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get('/todos/s')
            .send({});
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({
            message: "invalid id",
        });
    }));
    it('[GET] /todos - should return 404 if the id is not found ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get('/todos/2')
            .send({});
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({
            message: 'not Found'
        });
    }));
    //put tests
    it('[PUT] /todos - Should return a status 400 if is not a valid id', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .put('/todos/s')
            .send({});
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({
            message: "invalid id",
        });
    }));
    it('[PUT] /todos - Should return a status 404 if is not a valid id', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .put('/todos/3')
            .send({ description: 'Updated Description' });
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({
            message: 'something went wrong'
        });
    }));
    it('[PUT] /todos ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .put('/todos/1')
            .send({ description: 'Updated Description' });
        expect(res.statusCode).toEqual(200);
    }));
    //delete tests
    it('[DELETE] /todos - Should return a status 400 if is not a valid id', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete('/todos/s')
            .send({});
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({
            message: "invalid id",
        });
    }));
    it('[DELETE] /todos - Should return a status 404 if the id not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete('/todos/3')
            .send({});
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({
            message: 'nothing happened'
        });
    }));
    it('[DELETE] /todos ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete('/todos/1')
            .send({});
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({});
    }));
});
