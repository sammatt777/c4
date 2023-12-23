import mongoose from "mongoose";



const PassiveIncomeSchema = new mongoose.Schema({

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


const PasiveIncomeschemas = mongoose.models.PassiveIncomModel|| mongoose.model('PassiveIncomModel',PassiveIncomeSchema)
export default PasiveIncomeschemas;