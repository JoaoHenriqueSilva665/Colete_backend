import multer from 'multer'
import path from 'path'

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "temp", "uploads"),
    filename(request, file, cb ){
      const fileName = `${Date.now()}-${file.originalname}`
      cb(null, fileName)
    }
  }) 
}