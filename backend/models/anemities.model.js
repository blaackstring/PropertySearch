import mongoose from 'mongoose'

const NearbyAmenitySchema = new mongoose.Schema({
    propertyId:{
                type:String
            },
    type: { type: String },
    name: { type: String, },
    address: { type: String, },
    distance: { type: Number, },
    distanceText: { type: String, },
    duration: { type: String, },
      durationText: { type:String, },
    placeId: { type: String,  },
    rating: { type: Number },
    userRatingsTotal: { type: Number }
})

const NearbyAmenity = mongoose.model('NearbyAmenity', NearbyAmenitySchema)
export default NearbyAmenity