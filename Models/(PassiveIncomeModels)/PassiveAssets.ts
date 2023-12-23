import mongoose from "mongoose";



const PassiveAssetsSchemas = new mongoose.Schema({

        value:{
            type:String,
        },
        amount:{
            type:Number,
        },
        userId:{
            type:mongoose.Types.ObjectId
        }
})


const PassiveAssetsSchema =mongoose.models.PassiveAssetsModel || mongoose.model('PassiveAssetsModel',PassiveAssetsSchemas)
export default PassiveAssetsSchema
