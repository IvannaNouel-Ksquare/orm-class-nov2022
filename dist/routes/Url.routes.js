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
exports.UrlRouter = void 0;
const express_1 = require("express");
const Url_repo_1 = require("../repository/Url.repo");
const nanoid_1 = require("nanoid");
exports.UrlRouter = (0, express_1.Router)();
exports.UrlRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.body.url;
    if (!url) {
        res.status(400);
        return res.send({
            message: 'No URL'
        });
    }
    // Si tengo mi description
    // Debo crear un nuevo TODO y guardarlo a la DB
    const shortURL = (0, nanoid_1.nanoid)();
    const newURL = yield (0, Url_repo_1.createURL)(url, shortURL);
    res.status(201);
    res.send({
        newURL
    });
}));
exports.UrlRouter.get('/:short', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const short = req.params.short;
    if (!short) {
        res.status(400);
        return res.send({
            message: 'No URL'
        });
    }
    const currentURL = yield (0, Url_repo_1.getURL)(short);
    if (!currentURL) {
        res.status(400);
        return res.send({
            message: 'URL does not exist'
        });
    }
    res.status(201);
    res.send({
        currentURL,
    });
}));
