"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(amount: number , provider: string){
    const session = await getServerSession(authOptions);
    const token = Math.random().toString();
    const userId = session.user.id;

    if(!userId){
        return{
            message: "User not Logged in"
        }
    }

    await prisma.onRampTransaction.create({
        data: {
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            userId: Number(session?.user?.id),
            amount: amount * 100
        }
    })
}