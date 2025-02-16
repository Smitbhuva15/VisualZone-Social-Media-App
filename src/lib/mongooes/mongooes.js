import mongoose from "mongoose"

export const connnectDB=async()=>{
    try {
       await mongoose.connect(process.env.MONGO_URL);  
       console.log("mongodb connected succesFully !!!")

    } catch (error) {
        console.log("mongodb not connected @@")
    }
}