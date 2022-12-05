"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initURLModel = exports.URL = void 0;
const sequelize_1 = require("sequelize");
class URL extends sequelize_1.Model {
    getId() {
        return this.url;
    }
}
exports.URL = URL;
const initURLModel = (sequelize) => {
    URL.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        url: sequelize_1.DataTypes.STRING,
        shortUrl: sequelize_1.DataTypes.STRING,
    }, {
        sequelize // Instance of sequelize that reflects the connection
    });
};
exports.initURLModel = initURLModel;
