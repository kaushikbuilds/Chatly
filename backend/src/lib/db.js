import mongoose  from "mongoose";

 export async function connectDB() {
     try{
       const mongoUri = process.env.MONGO_URI

       if(!mongoUri){
        throw new Error("MONGO_URI is reuired")
       }

       const conn = await mongoose.connect(mongoUri)

       console.log("MongoDB Connect", conn.connection.host);
       
     } catch (error){
        console.error("MongoDB Connect Error:", error.message);
        process.exit(1);

     }
}