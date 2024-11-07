import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Users = ({id}) => {

    const [filter, setFilter] = useState("")

    useEffect(() => {
        const dataLogger = async () => {
            const res = await getData();
            console.log(res);
            setUsers(res)
        }
        dataLogger();
    }, [filter])

    async function getData() {
        console.log("id: "+id)
        const res = await axios(
            {
                url:"http://localhost:3000/api/v1/user/bulk?filter="+filter+"&by="+id,
                method:"GET",
            }
        )
        return res.data.users
    }

    const [users, setUsers] = useState([])

    return <div>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input placeholder="Search Users.." className="border rounded border-slate-200 w-full px-2 py-1" onChange={ e => setFilter(e.target.value)}></input>
        </div>
        <div>
            {users && users.length > 0 ? (users.map(user => <User key={user._id} user={user} />)) : ( <div>No users found.</div>)}
        </div>
    </div>
}

function User({user}){

    const navigate = useNavigate();
    
    return <div className="flex justify-between mt-2">
        <div className="flex">
            <div className="h-12 w-12 bg-slate-200 rounded-full flex justify-center mr-2 mt-1">
                <div className="flex flex-col justify-center h-full font-bold text-lg">
                    {user.firstName[0].toUpperCase()}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div className="font-semibold">
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-center h-full mt-2">
            <Button label={"Send Money"} onClick={() => navigate("/send?id="+user._id+"&name="+user.firstName)}></Button>
        </div>
    </div>
}