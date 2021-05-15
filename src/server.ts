import express from 'express'
import cors from 'cors'
import routes from './routes'
import path from 'path'

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.resolve(__dirname, "..", "temp", "uploads")))

app.listen(process.env.PORT || process.env.APP_URL , () =>{
  console.log('Started Server in Port 3333!')
})