"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class ItemsControllers {
    async index(request, response) {
        const items = await connection_1.default('items').select('*');
        const serializeItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                /* exp://192.168.0.10:19000 */
                image_url: `http://10.0.0.112:3333/uploads/${item.image}`
            };
        });
        return response.json(serializeItems);
    }
}
exports.default = ItemsControllers;
