import { Card } from "@repo/ui/card";

export const OnRampTransaction = ({
    transactions
}:{
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status : string,
        provider : string
    }[]
}) => {
    if(!transactions.length){
        return (
            <Card title="Recent Transaction">
                <div> No Recent Transaction</div>
            </Card>
        )
    }
    return (
        <Card title="Recent Transaction">
            <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {t.amount / 100}
                </div>

            </div>)}
            </div>
        </Card>
    )
}