
import Property from '../models/property.model.js'
import NearbyAmenity from '../models/anemities.model.js';
import fs from 'fs'
import mongoose from 'mongoose'


const ObjectId = mongoose.Types.ObjectId;
const data = JSON.parse(fs.readFileSync(new URL('../data1.json', import.meta.url)))

const amenitiesArrays = data.map(e => e.amenities); // array of arrays

export const insertion = async () => {
  try {

    const properties = await Property.insertMany(
      data.map(p => ({ ...p }))
    );

    console.log("✅ Properties inserted");
  } catch (error) {
    console.error("Insertion failed:", error);
  }
};


export const QueryData = async (req, res) => {
  try {

    console.log('here');

    const { city,
      minPrice,
      maxPrice,
      propertyType,
      minBedrooms,
      limit=10,
      sortBy,
      page } = req.query


    const offset = (page - 1) * limit
    const filter = {}

    if (city) filter['location.city'] = city
    if (propertyType) filter.propertyType = propertyType
    if (minPrice || maxPrice) {
      filter.price = {}

      if (maxPrice) filter.price.$lte = Number(maxPrice)
      if (minPrice) filter.price.$gte = Number(minPrice)
    }

    if (minBedrooms) filter.bedrooms = { $gte: Number(minBedrooms) };
    const sort = {}
    if (sortBy) sort[sortBy] = 1 //for acending odr 

    console.log(filter, sort)
    const data = await Property.find(filter).sort(sort).skip(offset).limit(limit);

    const totalCount = await Property.countDocuments(filter)

    if (!data) return res.status(404).send({ message: 'data not found', success: true })


    return res.status(200).send({ data, totalCount })

  } catch (error) {
    return res.status(500).send({ message: 'server error', success: false })

  }
}

export const QueryAmenities = async (req, res) => {
  try {
    const { id } = req.params;
    const { lat, lon, radius = 5000, types, limit = 10 } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ message: "lat and lon are required", success: false });
    }

    const Sradius = Number(radius);
    const Maxlimit = Number(limit);
    const AmenityTypes = types ? types.split(",") : [];
    console.log(AmenityTypes);
    const filter = { propertyId: id, $or: [{ radius: { $gte: 4000 } }, { radius: { $lte: 7000 }, }] };

    if (AmenityTypes.length > 0) filter.type = { $in: AmenityTypes };

    let data1 = await NearbyAmenity.find(filter)

 
const typess = ["restaurant", "atm", "hospital", "school", "pharmacy", "bank"];
    let newdata;
    if ((!data1[0]?.type|| data1?.length===0) && (AmenityTypes.length==0?typess:AmenityTypes).length > 0) {
      let allResults = [];
      console.log('hii from inside');

      for (const type of  (AmenityTypes.length==0?typess:AmenityTypes)) {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${Sradius}&type=${type}&key=${process.env.GOOGLE_API_KEY}`;
        const response = await fetch(url);
        const mapData = await response.json();

        if (mapData&&mapData?.results) {
          const places = mapData.results.slice(0, 1);
          console.log(places);
          

          const destinations = places
            .map(place => `${place.geometry.location.lat},${place.geometry.location.lng}`)
            .join('|');

          const distMatrixUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat},${lon}&destinations=${destinations}&mode=driving&key=${process.env.GOOGLE_API_KEY}`;

          const distResponse = await fetch(distMatrixUrl);
          const distData = await distResponse.json();
 
          let distances = [];
          if (distData.status === "OK") {
            distances = distData.rows[0].elements;
          }

          allResults.push(...places.map((place, index) => ({
            type,
            name: place.name,
            address: place.vicinity,
            placeId: place.place_id,
            rating: place.rating,
            userRatingsTotal: place.user_ratings_total,
            location: place.geometry.location,
            distance: distances[index]?.distance?.value || null,
            distanceText: distances[index]?.distance?.text || null,
            durationText: distances[index]?.duration?.text || null,
          })));
        }

      }


      console.log(id);

      if (allResults.length > 0) {
         await NearbyAmenity.insertMany(allResults.map(a => ({
          propertyId: id,
          ...a
        })))


      }

      newdata = allResults;
    }

    res.status(200).json({
      success: true,
      count: newdata?.length,
      newdata
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};


