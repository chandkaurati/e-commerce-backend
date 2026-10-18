import mongoose from "mongoose"


async function connectDb() {
      try {
         const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`)
         console.log(`MongoDB connected SuccessFully on ${connectionInstance.connection.host}`)
      } catch (error) {
         console.log(`Mongoose connection failed : ${error}`)
         throw error
      }
}

export default connectDb