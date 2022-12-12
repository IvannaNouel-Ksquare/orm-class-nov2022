"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const Todo_routes_1 = require("./routes/Todo.routes");
const Url_routes_1 = require("./routes/Url.routes");
const user_routes_1 = require("./routes/user.routes");
app.use(express_1.default.json());
app.use('/todos', Todo_routes_1.TodoRouter);
app.use('/users', user_routes_1.UserRouter);
app.get('/', (req, res) => {
    res.send('VIVEEEEEEEEEEE');
});
app.use('/url', Url_routes_1.UrlRouter);
exports.default = app;
