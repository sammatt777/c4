import mongoose from "mongoose";



const earnedExpenseSchema = new mongoose.Schema({

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


const earnedExpenseSchemas = mongoose.models.EarnedExpensesModels || mongoose.model('EarnedExpensesModels',earnedExpenseSchema)
export default earnedExpenseSchemas;