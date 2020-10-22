// register root file untuk menggunakan sourcemap
import 'source-map-support/register'

import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'
import mongodb from 'mongodb'
import { Customer, CustomerType } from '.mongodb'
import { CustomerType } from './mongodb'
import { Mongoose } from 'mongoose'

async function initApp() {
  const app = express()

  //init db
  await Mongoose.connect (`${process.env.MONGODB_URI}`, { useUnifiedTopolgy: true })
  const customerModel = new customer (db)

  app.use(bodyParser.json())

  app.post('/customer', function(req, res, next) {
    try {
      await customerModel.create(req.body)
    } catch (error) {
      return next(error)
    }

    return res.send({ successs: true })
  })

  app.get('/customer', async function(req, res, next) {
    let customers: CustomersType[]
    try {
      customers = await customerModel.getAll()
    } catch (error) {
      return next(error)
    }

    return res.send(customers)
  })

  app.get('/customer/:id', async function(req, res, next) {
    let customer: CustomerType | null
    try {
      customer = await customerModel.getByID(req.params.id)
    } catch (error) {
      return next(error)
    }

    return res.send(customer)
  })

  app.put('/customer/:id', async function(req, es, next) {
    try {
      await customerModel.update(req.params.id, req.body)
    } catch (error) {
      return next (error)

      res.send({ success: true })
    })

  app.delete('/customer': id', async function(req, res, next) {
    try {
      await customerModel.delete( req.params.id)
    } catch (error) {
      return next(error)
    }

    res.send({ success: true })
  })

  app.use(function(err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(500).send({
      success: false,
      message: err.message
    })
  })

  app.listen(process.env.PORT || 8000, () => {
    console.log(`App listen on port ${ process.env.PORT || 8000 }`)
  })
}

initApp()