import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users"
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

export function Dashboard() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            alert("You must be logged in to access this page.");
            navigate("/signin");
        }
    }, [token, navigate]);

    if (!token) return null;

    const [balance, setBalace] = useState(0);
    const [username, setUsername] = useState("");


    const tokenArray = token.split(" ");
    const jwtToken = tokenArray[1];

    const decodedValue = jwtDecode(jwtToken);
    
    const id = decodedValue.userId;


    useEffect(() => {

        const getData = async () => {
            const balance = await getBalance();
            setBalace(balance)
        }

        getData()
    }, [])

    useEffect(() => {

        const getName = async () => {
            const name = await getUsername();
            setUsername(name);
        }

        getName()

    }, [])

    async function getBalance() {
        const res = await axios(
            {
                url:"http://localhost:3000/api/v1/account/balance",
                method: "GET",
                headers: {
                    Authorization: token
                }
            }
        );
        return res.data.balance
    }

    async function getUsername() {
        const res = await axios(
            {
                url:"http://localhost:3000/api/v1/user/getUsername?id="+id,
                method: "GET"
            }
        )
        return res.data.user.firstName;
    }

    return <div>
        <div className="m-4">
            <Appbar username={username}></Appbar>
        </div>
        <div className="m-8">
        <Balance balance={balance}></Balance>
        <div className="space-y-4">
            <Users id={id}></Users>
        </div>
        <div className="mt-4">
            <Button label={"Log Out"} onClick={() => {
                localStorage.removeItem("token")
                navigate("/signin")
            }}></Button>
        </div>
        </div>
    </div>
}