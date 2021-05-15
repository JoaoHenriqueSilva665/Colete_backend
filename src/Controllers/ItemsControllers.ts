import { Request, Response } from "express";
import db from "../database/connection";

export default class ItemsControllers {

  async index(request: Request, response: Response) {
    const items = await db('items').select('*')
    const serializeItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        /* exp://192.168.0.10:19000 */
        image_url: `http://10.0.0.112:3333/uploads/${item.image}`
      }
    })

    return response.json(serializeItems)
  }
}


