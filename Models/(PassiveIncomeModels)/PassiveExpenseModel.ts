import mongoose from "mongoose";



const PassiveExpenseSchemas = new mongoose.Schema({

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



const PassiveExpenseSchema = mongoose.models.PassiveExpenseModel||mongoose.model('PassiveExpenseModel',PassiveExpenseSchemas)
export default PassiveExpenseSchema;