import dotenv from 'dotenv'
import axios from 'axios';
import express from 'express'

const mainRouter = express.Router()

mainRouter.get('/accounting', async(req, res, next) => {
      console.log('main router')
      res.render('index', {pageTitle: 'Accounting'})
})

export default mainRouter
