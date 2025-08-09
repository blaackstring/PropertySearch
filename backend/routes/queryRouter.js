import express from 'express'
import { QueryAmenities, QueryData } from '../controllers/Handler.js'

const Router=express.Router()
Router.get('/search',QueryData)
Router.get('/:id/nearby-amenities',QueryAmenities)


export default Router;