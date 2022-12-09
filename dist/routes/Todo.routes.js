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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRouter = void 0;
const express_1 = require("express");
const Todo_repo_1 = require("../repository/Todo.repo");
exports.TodoRouter = (0, express_1.Router)();
exports.TodoRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description } = req.body;
    if (!description) {
        res.status(400);
        return res.send({
            message: 'No description'
        });
    }
    // Si tengo mi description
    // Debo crear un nuevo TODO y guardarlo a la DB
    const newTodoId = yield (0, Todo_repo_1.createTodo)(description);
    res.status(201);
    res.send({
        id: newTodoId,
        description
    });
}));
exports.TodoRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    if (!id) {
        res.status(400);
        return res.send({
            message: 'invalid id'
        });
    }
    const Todo = yield (0, Todo_repo_1.fetchTodoById)(id);
    console.log(Todo);
    if (!Todo) {
        res.status(404);
        return res.send({
            message: 'not Found'
        });
    }
    res.send({
        Todo
    });
}));
exports.TodoRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { description, is_completed } = req.body;
    if (!id) {
        res.status(400);
        return res.send({
            message: 'invalid id'
        });
    }
    const todo = {
        id: parseInt(id),
        description,
        is_completed
    };
    const affectedRows = yield (0, Todo_repo_1.updateTodoById)(todo);
    if (!affectedRows) {
        res.status(404);
        return res.send({
            message: 'something went wrong'
        });
    }
    res.send(affectedRows);
}));
exports.TodoRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    if (!id) {
        res.status(400);
        return res.send({
            message: 'invalid id'
        });
    }
    const Todo = yield (0, Todo_repo_1.deleteTodoById)(id);
    if (!Todo) {
        res.status(404);
        return res.send({
            message: 'nothing happened'
        });
    }
    return res.sendStatus(200);
}));
