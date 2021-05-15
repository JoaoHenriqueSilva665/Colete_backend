"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class PointsControllers {
    async index(request, response) {
        const { items } = request.query;
        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));
        const points = await connection_1.default('points')
            .join("point_items", "points.id", "=", "point_items.point_id")
            .whereIn('point_items.item_id', parsedItems)
            .distinct()
            .select('points.*');
        const serializedPoints = points.map(point => {
            return Object.assign(Object.assign({}, point), { image_url: `http://10.0.0.112:3333/uploads/${point.image}` });
        });
        return response.json(serializedPoints);
    }
    async show(request, response) {
        const { id } = request.params;
        const point = await connection_1.default('points').where("id", id).first();
        if (!point) {
            return response.status(400).json({ error: "Point Not found" });
        }
        const serializedPoint = Object.assign(Object.assign({}, point), { image_url: `http://10.0.0.112:3333/uploads/${point.image}` });
        const items = await connection_1.default('items')
            .join('point_items', 'items.id', "=", "point_items.item_id ")
            .where('point_items.point_id', id)
            .select('items.title');
        return response.json({ point: serializedPoint, items });
    }
    async create(request, response) {
        const { name, email, whatsapp, latitude, longitude, items } = request.body;
        const trx = await connection_1.default.transaction();
        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
        };
        const insertedIds = await trx('points').insert(point);
        const point_id = insertedIds[0];
        const pointItems = items
            .split(',')
            .map((item) => Number(item.trim()))
            .map((item_id) => {
            return {
                item_id,
                point_id
            };
        });
        await trx('point_items').insert(pointItems);
        await trx.commit();
        return response.json(Object.assign({ id: point_id }, point));
    }
}
exports.default = PointsControllers;
