import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'
import methodOverride from 'method-override'
import http from 'http'
import io from 'socket.io'
import ss from 'socket.io-stream'
import webpack from 'webpack';
import config from './webpack.config';
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackMiddleware from 'webpack-dev-middleware'
import mainRouter from './src/routes/mainRouter'
import bodyParser from 'body-parser'
import fs from 'fs'
import csv from 'csvtojson'
import prettyjson from 'prettyjson'
import dbConnection from './src/db'
import morgan from 'morgan'

const app = express()
const port = process.env.PORT || 3000
const db = dbConnection()

// WEBPACK CONFIGURATIONS
const compiler = webpack(config);
const options = {
    noInfo: true,
    publicPath: config.output.publicPath
}
const middleware = webpackMiddleware(compiler, options )

app.use(webpackHotMiddleware(compiler))
app.use(middleware)

// Middleware
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src/assets')));
// View engine
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');

// Routes
app.use('/', mainRouter);

// app.get('/', (req, res, next) => {
//     console.log(__dirname)
//     res.render('index', {pageTitle: 'HomePage'})
// })

// Handle connection
// const socketServer = http.createServer(app)
// const clientSocket = io.listen(socketServer)

// clientSocket.on('connection', function(socket) {
//     //logs
//     const connectMsg = "Client connected to socket"
//     const disconnectMsg = 'Client disconnected from socket'
//     console.log(connectMsg);
//     socket.on('disconnect', () => {
//         console.log(disconnectMsg)
//     })

//     //readCSVStream
//     const csvReadStream = fs.createReadStream('./gdax_fills.csv')
//     const sendData = function(data) {
//         socket.emit('tradeFills', data)
//     }
    
//     let fillHistory = []
//     csv().fromStream(csvReadStream)
//             .on('json', tradeFills => {
//                 fillHistory.push(tradeFills)
//             })
//             .on('end', (err) => {
//                 sendData(fillHistory)
//             })
            
// });

//INIT APP LISTENING
// socketServer.listen(3001,() => {
//       console.log('Websocket listening on port: ' + 3001)
// })
app.listen(port, () => {
      console.log('App Server listening on port: ' + port)
})

export default {app}




