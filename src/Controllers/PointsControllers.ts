import { Request, Response } from "express";
import db from "../database/connection";

export default class PointsControllers {
  async index(request: Request, response: Response) {
    const { items } = request.query

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()))

    const points = await db('points')
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn('point_items.item_id', parsedItems)
      .distinct()
      .select('points.*')

    const serializedPoints = points.map(point => {
      return {
        ...point,
        image_url: `http://10.0.0.112:3333/uploads/${point.image}`
      }
    })

    return response.json(serializedPoints)
  }

  async show(request: Request, response: Response) {
    const { id } = request.params
    const point = await db('points').where("id", id).first()

    if (!point) {
      return response.status(400).json({ error: "Point Not found" })
    }

    const serializedPoint = {
      ...point,
      image_url: `http://10.0.0.112:3333/uploads/${point.image}`
    }

    const items = await db('items')
      .join('point_items', 'items.id', "=", "point_items.item_id ")
      .where('point_items.point_id', id)
      .select('items.title')

    return response.json({ point: serializedPoint, items })
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      items
    } = request.body

    const trx = await db.transaction()

    const point = {
      image: request.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
    }

    const insertedIds = await trx('points').insert(point)

    const point_id = insertedIds[0]
    const pointItems = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
        return {
          item_id,
          point_id
        }
      })

    await trx('point_items').insert(pointItems)
    await trx.commit()

    return response.json({
      id: point_id,
      ...point,
    })
  }
}


