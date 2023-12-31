import mongoose from 'mongoose'
function initDB(){
    if(mongoose.connections[0].readystate){
        console.log("already connected")
        return
    }
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    mongoose.connection.on('connected',()=>{
        console.log("connected to mongo ")
    })
    mongoose.connection.on('error',()=>{
        console.log("error in connecting",err)
    })
    
}

export default initDB