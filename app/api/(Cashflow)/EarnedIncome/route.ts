import earnedIncomeSchemas from "@/Models/earnedIncomeSchema";
import { MongoDb } from "@/lib/mongoDb";
import  JsonWebToken  from "jsonwebtoken";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";



MongoDb()

export async function GET(){

    const AuthToken:any = cookies().get('AuthToken')?.value
    // console.log(AuthToken,'AuthToken eanred=---income');

    const key:any=process.env.JWT_KEY;
   const {userId}:any=  JsonWebToken.verify(AuthToken,key)
    // console.log(userId);

    const resp:any = await earnedIncomeSchemas.find({userId:userId});
        // console.log(resp);
        
    return NextResponse.json(resp)
};




export async function POST(request:any ){
    const {value,amount}:any = await request.json()
            // console.log({value,amount,userId});
            
    try {
        const AuthToken:any = cookies().get('AuthToken')?.value
        // console.log(AuthToken,'AuthToken eanred=---income');
    
        const key:any=process.env.JWT_KEY;
       const {userId}:any=  JsonWebToken.verify(AuthToken,key)
        

        const respObj:any= await new earnedIncomeSchemas({value,amount,userId})
        const savedObj = await respObj.save()
        // console.log(savedObj);
        
        return NextResponse.json({respObj,Message:'Income data saved'})
    

    } catch (error:any) {
        return NextResponse.json(error.message)
    }

}




export async function PUT(request:any) {
    try {
        const data: any = await request.json()
        // console.log(data.id, 'deleteeeeeee');
        const resp = await earnedIncomeSchemas.findByIdAndDelete(data.id)
        
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
       const deletedMany= await earnedIncomeSchemas.deleteMany()
            if(deletedMany){
                console.log(deletedMany);
            }

            const addedMany:any= await earnedIncomeSchemas.insertMany(data)

        return NextResponse.json(addedMany);
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return NextResponse.json({ error: 'Invalid JSON input' }, { status: 400 });
    }
}

