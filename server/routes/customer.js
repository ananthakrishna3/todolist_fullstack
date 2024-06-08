import express from 'express'
const router = express.Router()
import {customerController} from '../controllers/customerController'

router.get('/',customerController.homepage)


export {router as customerRoute}