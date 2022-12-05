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
exports.getURL = exports.createURL = void 0;
const Url_model_1 = require("../models/Url.model");
// Create operation
const createURL = (url, shortUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(url);
        console.log(shortUrl);
        const newURL = yield Url_model_1.URL.create({
            url,
            shortUrl,
        });
        return `${process.env.HOST}/url/${newURL === null || newURL === void 0 ? void 0 : newURL.shortUrl}`;
    }
    catch (error) {
        console.error(error);
    }
});
exports.createURL = createURL;
const getURL = (shortUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newURL = yield Url_model_1.URL.findOne({
            where: {
                shortUrl,
            },
        });
        return newURL === null || newURL === void 0 ? void 0 : newURL.url;
    }
    catch (error) {
        console.error(error);
    }
});
exports.getURL = getURL;
