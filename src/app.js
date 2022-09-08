import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import { Server } from 'socket.io'
import viewsRouter from './routes/views.router.js'
import productContainerKnex from './container/productContainerKnex.js'
import chatContainerKnex from './dao/MongoDAO/Messages.js'
import productTestRouter from './routes/productTest.router.js'
import usersRouter from './routes/user.router.js'
import messageRouter from './routes/message.router.js'
import messageNormalizerRouter from './routes/messagesNormalize.router.js'


const app = express()
const productService = new productContainerKnex();
const chatService = new chatContainerKnex();



const server = app.listen(8080, () => {
  console.log('listening on 8080 port \n')
})


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.static(__dirname + '/public'))


app.use('/', viewsRouter)
app.use('/api/products-test',productTestRouter);
app.use('/api/users',usersRouter);
app.use('/api/messages',messageRouter);
app.use('/api/message',messageNormalizerRouter);

const io = new Server(server)
let products
let log

io.on('connection', async (socket) => {

  products = await productService.getAllProduct()

  log = await chatService.getAll()



  console.log('Socket connected')
  socket.broadcast.emit('newUserConnected')
  io.emit('log', log)
  socket.emit('productList', { products })

  socket.on('message', async(data) => {
    let currentTime = new Date();
    data.date = currentTime.toLocaleTimeString();
    await chatService.addChat(data)

    log = await chatService.getAll()
    io.emit('log', log)
  })
    
  socket.on('addProduct', async (data) => {
    await productService.addNewProduct(data)
    products = await productService.getAllProduct()
    io.emit('productList', { products })
  })

    
})
