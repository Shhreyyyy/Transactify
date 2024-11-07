import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";

export function Send() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if(!token) {
            alert("You must be logged in to access this page")
            navigate("/signin")
        }
    }, [token,navigate])

    if(!token) return null;
    
    const [searchParams] = useSearchParams();

    const [amount, setAmount] = useState(0);

    const id = searchParams.get("id");
    const name = searchParams.get("name");


    return <div className="flex justify-center h-screen bg-slate-300">
        <div className="h-full flex flex-col justify-center">
            <div className="bg-white rounded-lg p-8 space-y-8 border h-min w-96">
                <div className="flex justify-center">
                    <Heading label={"Send Money"}></Heading>
                </div>
                <div className="flex">
                    <div className="h-12 w-12 bg-slate-200 rounded-full flex flex-col justify-center">
                        <div className="font-bold flex justify-center">
                            {name[0].toUpperCase()}
                        </div>
                    </div>
                    <div className="font-semibold text-lg ml-3 flex flex-col justify-center">
                        {name}
                    </div>

                </div>
                <InputBox label={"Amount (in ₹)"} placeholder={"Enter Amount"} onChange={e => setAmount(e.target.value)}></InputBox>
                <Button label={"Initiate Transfer"} onClick={ async () => {
                    if (isNaN(amount)) {
                        alert("Please Enter A Number")
                        return;
                    }

                    
                    try {

                    const token = localStorage.getItem("token")
                
                    await axios(
                        {
                            url:"http://localhost:3000/api/v1/account/transfer",
                            method: "POST",
                            headers: {
                                Authorization: token
                            },
                            data: {
                                to: id,
                                amount: amount
                            }
                        }
                    );

                    alert("Transaction Successful!")
                    
                    navigate("/dashboard");
                    } catch (e) {
                        alert("Low Balance")
                    }
                }}></Button>
            </div>
        </div>
</div>
}