import dotenv from 'dotenv';
dotenv.config();

import app from "../../app"; //express
import { startSequelize } from "../../models"; //iniciar la base
import { Sequelize } from "sequelize";
import request from 'supertest';
import envs from '../../models/ConfigDBs';
import { createTodo } from '../../repository/Todo.repo';

describe('Todo routes', () => {
    let testDB: Sequelize; //la base de datos

    beforeAll(async () => {
        testDB = startSequelize(envs.test.database, envs.test.passwd, envs.test.host, envs.test.username);

        await testDB.sync({ force: true });
        // await  createTodo('Test for GET')
    })

    afterAll(async () => {
        await testDB.close()
    })

    //posts tests
    it('[POST] /todos - should return 201 after its creation', async () => {
        const res = await request(app)
            .post('/todos')
            .send({ description: 'Unit testinf with Jest and Supertest ;)' })
        console.log(res.body);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
            id: 1,
            description: 'Unit testinf with Jest and Supertest ;)'
        })
    })

    it('[POST] /todos -should return 400 after receinving incorrect body', async () => {

        const res = await request(app)
            .post('/todos')
            .send({})
        expect(res.statusCode).toEqual(400);

    })

    //get tests
    it('[GET] /todos - should return 200 when id is found and return the description ', async () => {
        const res = await request(app)
            .get('/todos/1')
            .send({})
        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual(1);
        expect(res.body).toHaveProperty('id', 1);
        expect(res.body).toHaveProperty('description', 'Unit testinf with Jest and Supertest ;)');
        expect(res.body).toEqual({
            id: 1,
            description: 'Unit testinf with Jest and Supertest ;)',
            is_completed: true
        })
    })

    it('[GET] /todos - should return 400 if the id is not valid ', async () => {
        const res = await request(app)
            .get('/todos/s')
            .send({})
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({
            message: "invalid id",
        });
    })

    it('[GET] /todos - should return 404 if the id is not found ', async () => {
        const res = await request(app)
            .get('/todos/2')
            .send({})
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({
            message: 'not Found'

        });

    })

    //put tests
    it('[PUT] /todos - Should return a status 400 if is not a valid id', async () => {
        const res = await request(app)
            .put('/todos/s')
            .send({})
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({
            message: "invalid id",
        })
    })
    it('[PUT] /todos - Should return a status 404 if is not a valid id', async () => {
        const res = await request(app)
        .put('/todos/3')
        .send({description: 'Updated Description'})
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({
        message: 'something went wrong'
        })
    })

    it('[PUT] /todos ', async () => {
        const res = await request(app)
            .put('/todos/1')
            .send({ description: 'Updated Description' })
        expect(res.statusCode).toEqual(200);
    })

    //delete tests
    it('[DELETE] /todos - Should return a status 400 if is not a valid id', async () => {
        const res = await request(app)
            .delete('/todos/s')
            .send({})
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({
            message: "invalid id",
        })
    })

    it('[DELETE] /todos - Should return a status 404 if the id not found', async () => {
        const res = await request(app)
            .delete('/todos/3')
            .send({})
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({
            message: 'nothing happened'
        })
    })

    it('[DELETE] /todos ', async () => {
        const res = await request(app)
            .delete('/todos/1')
            .send({})
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({

        })
    })

})