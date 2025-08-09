import mongoose from 'mongoose'

console.log(process.env.MONGO_URL);

const DbConnection=async()=>{
    try {
        const db=await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`)

        if(db.connection.readyState==1){
            console.log(`Db connected`);    
            return        
        }
        process.exit(1)
    } catch (error) {
        console.log('error while connecting db',error)
    }
}

export default DbConnection;