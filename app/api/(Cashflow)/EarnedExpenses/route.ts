import { MongoDb } from "@/lib/mongoDb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import  JsonWebToken  from "jsonwebtoken";
import earnedExpenseSchemas from "@/Models/EarnedExpensesSchema";


MongoDb()

export async function GET() {

    const AuthToken:any =  cookies().get('AuthToken')?.value
   
    const key:any=process.env.JWT_KEY;
    const verified:any=  JsonWebToken.verify(AuthToken,key)

    try {

        const resp:any = await earnedExpenseSchemas.find({userId:verified.userId})
            console.log(resp);
            return NextResponse.json(resp)
            
        
    } catch (error:any) {
        return NextResponse.json(error.message)
    }

}




export async function POST(  request:any  ) {
    
    // console.log('eeeeeeeeeeee');
    
    const {value,amount}:any = await request.json()
        // console.log(value,amount);
        
        const AuthToken:any = cookies().get('AuthToken')?.value
        // console.log(AuthToken,'AuthToken');
        
        const key:any=process.env.JWT_KEY;
        const verified:any= JsonWebToken.verify(AuthToken,key)
        // console.log(verified,'verified');
        

try {

    const respObj:any =new earnedExpenseSchemas({value,amount,userId:verified.userId})
    const savedObj = await respObj.save()
    console.log(savedObj);
    
    return NextResponse.json({savedObj,Message:'earnedExpenseSchemas data saved'})


} catch (error:any) {
 
    return NextResponse.json(error.message)
}

}




export async function PUT(request:any) {
    try {
        const data: any = await request.json()
        console.log(data.id, 'deleteeeeeee');
        const resp = await earnedExpenseSchemas.findByIdAndDelete(data.id)
        
        return NextResponse.json(resp);
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return NextResponse.json({ error: 'Invalid JSON input' }, { status: 400 });
    }
}






export async function DELETE(request:any) {
    try {
        const data: any = await request.json()
        console.log(data, 'deleteeeeeee');

        // const resp = await earnedIncomeSchemas.findByIdAndDelete(data.id)
       const deletedMany= await earnedExpenseSchemas.deleteMany()
            if(deletedMany){
                console.log(deletedMany);
            }

            const addedMany:any= await earnedExpenseSchemas.insertMany(data)

        return NextResponse.json(addedMany);
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return NextResponse.json({ error: 'Invalid JSON input' }, { status: 400 });
    }
}

