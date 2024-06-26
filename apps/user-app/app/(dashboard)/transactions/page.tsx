import { P2P } from "../../../components/P2PTrans";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

async function getOnRampTransaction(){
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where:{
            fromUserId : Number(session?.user?.id)
        }
    });
    return (txns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        fromUserId : t.fromUserId,
        toUserId : t.toUserId
    })))
}

export default async function() {
    const transactions = await getOnRampTransaction();
    return <div className="w-full mr-8 mt-3">
        <P2P transactions={transactions}/>
    </div>
}