
import dotenv from 'dotenv'
dotenv.config({path:'.env'})
import express from 'express'
import DbConnection from './config/db.js';
import Router from './routes/queryRouter.js';
import cors from 'cors'
// import { insertion } from './controllers/Handler.js';



const app=express();
DbConnection()
// insertion()
app.use('/api/property',Router)
app.use(cors(
    {origin:'http://localhost:5173/',
        methods:"GET"

    }
))

const port=4000|| process.env.PORT
app.listen(port,()=>{
    console.log(`server running on Port ${port}`);
    
})
