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
exports.UserRouter = void 0;
const express_1 = require("express");
const firebase_1 = require("../firebase");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const isAuthorized_1 = require("../middlewares/isAuthorized");
exports.UserRouter = (0, express_1.Router)();
//endpoint para crear usuarios
exports.UserRouter.post('/newUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //info desde el body
    //checar si falta info
    //checar que el rol sea adecuado
    const { displayName, email, password } = req.body;
    if (!displayName || !email || !password) {
        return res.status(400).send({
            error: 'missing data'
        });
    }
    try {
        const userId = yield (0, firebase_1.creatUser)(displayName, email, password, 'patient');
        res.status(201).send({
            userId
        });
    }
    catch (error) {
        res.status(500).send({ error: 'something went wrong' });
        console.log(error);
    }
}));
exports.UserRouter.put('/disable/:uid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let uid = req.params.uid;
    const { disabled } = req.body;
    if (disabled === undefined || typeof disabled !== 'boolean') {
        return res.status(400).send({
            error: 'invalid data'
        });
    }
    try {
        const user = yield (0, firebase_1.disableUser)(uid, disabled);
        if (!user) {
            return res.status(400).send({
                error: "invalid id"
            });
        }
        res.status(200).send(user);
    }
    catch (error) {
        res.status(500).send({ error: 'something went wrong' });
    }
}));
exports.UserRouter.put('/update/:uid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let uid = req.params.uid;
    const { displayName, email, password } = req.body;
    try {
        const updatedUser = yield (0, firebase_1.updateUser)(uid, displayName, email, password);
        if (!updatedUser) {
            return res.status(400).send({
                error: "invalid id"
            });
        }
        res.status(201).send({
            updatedUser
        });
    }
    catch (error) {
        res.status(500).send({ error: 'something went wrong' });
    }
}));
exports.UserRouter.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, firebase_1.getAllUsers)();
        res.status(202).send({
            users
        });
    }
    catch (error) {
        res.status(500).send({ error: 'something went wrong' });
    }
}));
exports.UserRouter.get('/:uid', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ role: ['admin'], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let uid = req.params.uid;
    try {
        const user = yield (0, firebase_1.readUser)(uid);
        if (!user) {
            return res.status(400).send({
                error: "invalid id"
            });
        }
        res.status(202).send({
            user
        });
    }
    catch (error) {
        res.status(500).send({ error: 'something went wrong' });
    }
}));
