export const Appbar = ({username}) => {

    const displayName = username && username.length > 0 ? username[0].toUpperCase() : '';

    return <div className="flex justify-between">
        <div className="flex flex-col justify-center ml-4">
            <div className="text-2xl font-bold">
                Transactify
            </div>
        </div>
        <div className="flex">
            <div className="font-bold flex flex-col justify-center mr-4">
                {username}
            </div>
            <div className="mt-1 mr-2 bg-slate-200 h-12 w-12 flex justify-center rounded-full">
                <div className="font-bold flex flex-col text-xl justify-center h-full">
                    {displayName}
                </div>
            </div>
        </div>
    </div>
}