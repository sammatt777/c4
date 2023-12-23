import UserModel from "@/Models/userSchema";
import { MongoDb } from "@/lib/mongoDb";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'


MongoDb()

export async function POST(request: any) {
    try {
        const {email,password,name} = await request.json();
        console.log(email,password,name);
        const hashPassword:any = await bcrypt.hash(password,10)
            console.log(hashPassword);
            
        const user = new UserModel({email,password:hashPassword,name});
        const savedUser = await user.save();
            console.log(savedUser);
            
        return NextResponse.json(savedUser);

    } catch (error:any) {
        console.error(error);
        return NextResponse.json(error.Message);
    }
}

