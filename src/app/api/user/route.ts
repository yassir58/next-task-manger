import { NextResponse } from "next/server";
import { prisma } from "~/server/db";
import z from 'zod'

export const requestSchema = z.object({
    name: z.string(),
    email: z.string().email (),
    password:z.string().min(6)
})

export async function POST (req:Request){

    const bcrypt = await import('bcrypt');
    try {

        const body = await req.json ();
        
        const {name, email, password} = requestSchema.parse (body) ;
        const emailAlreadyExist = await prisma.user.findUnique ({
            where:{email:email}
        })
        const userAlreadyExist = await prisma.user.findUnique ({
            where:{name:name}
        })
        if (emailAlreadyExist)
            return NextResponse.json ({user:null, message:'this email is already registered'}, {status:409})
        if (userAlreadyExist)
            return NextResponse.json ({user:null, message:'this username alreay exist'}, {status:409})
        const hashedPassword =  await bcrypt.hash (password, 10);
        const newUser =  await prisma.user.create({
                data: {
                  name: name,
                  email: email,
                  password: hashedPassword,
                },
              });
        return NextResponse.json ({user:newUser, message:'User created succesfully'}, {status:201})
    }catch (err:any){
        console.log (err)
        return NextResponse.json ({user:null, message:err}, {status:500})
    }
}