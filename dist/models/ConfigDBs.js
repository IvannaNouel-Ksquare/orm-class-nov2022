"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    prod: {},
    dev: {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        passwd: process.env.DB_PASS,
        host: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT
    },
    test: {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        passwd: process.env.DB_PASS,
        host: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT
    }
};
