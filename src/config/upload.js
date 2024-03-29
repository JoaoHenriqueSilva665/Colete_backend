"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
exports.default = {
    storage: multer_1.default.diskStorage({
        destination: path_1.default.resolve(__dirname, "..", "..", "temp", "uploads"),
        filename(request, file, cb) {
            const fileName = `${Date.now()}-${file.originalname}`;
            cb(null, fileName);
        }
    })
};
