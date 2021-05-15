"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const PointsControllers_1 = __importDefault(require("./Controllers/PointsControllers"));
const ItemsControllers_1 = __importDefault(require("./Controllers/ItemsControllers"));
const upload_1 = __importDefault(require("./config/upload"));
const routes = express_1.Router();
const pointsController = new PointsControllers_1.default();
const itemsControllers = new ItemsControllers_1.default();
const uploadConfig = multer_1.default(upload_1.default);
routes.get('/items', itemsControllers.index);
routes.post('/points', uploadConfig.single('image'), pointsController.create);
routes.get('/points/', pointsController.index);
routes.get('/points/:id', pointsController.show);
exports.default = routes;
