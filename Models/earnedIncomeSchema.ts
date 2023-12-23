import mongoose from "mongoose";



const earnedIncomeSchema = new mongoose.Schema({

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


const earnedIncomeSchemas = mongoose.models.EarnedIncomeModel || mongoose.model('EarnedIncomeModel',earnedIncomeSchema)
export default earnedIncomeSchemas;