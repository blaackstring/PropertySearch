import mongoose from 'mongoose'


const PropertySchema = new mongoose.Schema({
		title:{
            type:String,
            required:true
        },
		description:{
            type:String,
            required:true
        },
		price:{
            type:Number,
            required:true
        },
		location:{
				city:{ type: String, required: true },
				state:{ type: String, required: true },
				pincode:{ type: String, required: true }
		},
		propertyType:{
            type:String,
            required:true
        },
		bedrooms:{
            type:Number,
            required:true
        },
		bathrooms:{
            type:Number,
            required:true
        },
		area:{
            type:Number,
            required:true
        },
		amenities:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'NearbyAmenity'
        }],
        coordinates:{
            type:Object
        },
		images:{
            type:Object
        },
		listedDate:{
            type:Date,
            default:Date.now
        }
},{timestamps:true})

const Property=mongoose.model('Property', PropertySchema)
export default Property;