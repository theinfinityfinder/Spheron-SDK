import mongoose  from 'mongoose'

const fileSchema = new mongoose.Schema({
    
    mediaUrl:{
        type:String,
        required:true
    }
    
},{
 
    timestamps:true

})

export default mongoose.models.file || mongoose.model('file',fileSchema)