import mongoose from "mongoose"


const LiabilitiesSchema:any = new mongoose.Schema({

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


const LiabilitiesModel = mongoose.models.EarnedLiabilities|| mongoose.model('EarnedLiabilities',LiabilitiesSchema)
export default LiabilitiesModel;