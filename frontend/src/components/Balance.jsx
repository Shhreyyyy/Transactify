export const Balance = ({balance}) => {
    return <div className="flex">
        <div className="font-bold text-lg">
            Your Balance:
        </div>
        <div className="font-semibold ml-2 text-lg">
            ₹{Math.floor(balance)}
        </div>
    </div>
}