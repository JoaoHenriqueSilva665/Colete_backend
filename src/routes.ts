import { Router } from 'express'
import multer from 'multer'

import PointsControllers from './Controllers/PointsControllers'
import ItemsControllers from './Controllers/ItemsControllers'
import configUpload from './config/upload'

const routes = Router()
const pointsController = new PointsControllers()
const itemsControllers = new ItemsControllers()
const uploadConfig = multer(configUpload)

routes.get('/items', itemsControllers.index)

routes.post('/points', uploadConfig.single('image'), pointsController.create)
routes.get('/points/', pointsController.index)
routes.get('/points/:id', pointsController.show)

export default routes