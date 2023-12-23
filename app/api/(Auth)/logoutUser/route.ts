import { cookies } from "next/headers";
import { NextResponse } from "next/server";




export async function POST() {

    const response: any = NextResponse.json('logOut');
        cookies().set({
            name: 'AuthToken',
            value: '',
            expires:new Date(0)
          })


         

        return response;

}