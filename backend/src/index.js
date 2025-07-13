import dotenv from "dotenv";
dotenv.config();
import {app} from "./app.js"
import connectDB from "./db/index.js";

connectDB()
.then( ()=>{
    app.listen(process.env.PORT || 5000,()=>{
         console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.error("MongoDB connection failed ",err)
    process.exit(1)
})
// console.log(app)