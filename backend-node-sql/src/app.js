import express from 'express'
import cors from 'cors'
import db from './db/index.js'
import router from './route/index.js'
import { createServer } from 'http'


const app = express()

app.use(cors())
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json({ limit: '50mb' }))

//db
db.sequelize.sync();

app.use('/api/v1/', router)




app.get('/', async (req, res) => {
    res.send(`<h2>Hello World  goto http://localhost:4000/api/v1 </h2>`);
});

const httpServer = createServer(app);

httpServer.listen(4000, () => {
    console.log(`Rest API is now running on http://localhost:${4000}/api/v1`);
});