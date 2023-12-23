'use server'
import UserModel from "@/Models/userSchema";
import { MongoDb } from "@/lib/mongoDb";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import JsonWebToken from "jsonwebtoken";
import {cookies} from 'next/headers'


MongoDb()
export async function POST(request: any,) {


    const { email, password } = await request.json();


    try {

        const user = await UserModel.findOne({ email })
        if (user == null) {
            return NextResponse.json('email')
        }

        const passwordMatched: any = await bcrypt.compare(password, user.password)
        // console.log(passwordMatched);
        if (!passwordMatched) {
            return NextResponse.json('password')
        }

        const secretKey: any = process.env.JWT_KEY
        const token = JsonWebToken.sign({ userId: user._id }, secretKey)

        const response: any = NextResponse.json('logined');
        cookies().set({
            name: 'AuthToken',
            value: token,
            httpOnly: true,
            path: '/',
            maxAge:60*60
          })


         

        return response;


    } catch (error: any) {

        return NextResponse.json({ message: error.message })
    }

}

 
 
export async function GET() {


    try {
        const AuthToken:any = cookies().get('AuthToken')?.value
        console.log(AuthToken,'AuthToken');
    
        const key:any=process.env.JWT_KEY;
       const verified:any=  JsonWebToken.verify(AuthToken,key)
    
       const loginedUser = await UserModel.findById(verified.userId).select('-password')
    
        return NextResponse.json(loginedUser);
        


    } catch (error:any) {
        return NextResponse.json(error.message)
    }


}
