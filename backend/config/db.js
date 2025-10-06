
const mongoose = require("mongoose");


const connectDB = async() => {
    try{
       
        
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            //must add in order to not get any error masseges:
            // useUnifiedTopology:true,
            // useNewUrlParser: true,
            
        });
        console.log(`MongoDB connected: ${conn.connection.host}`)

    }catch(error){
        console.log(`Error: ${error.message}` )
        process.exit(1)

    }
}

module.exports = connectDB
//export default connectDB