import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export function Signin() {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            alert("You are already logged in");
            navigate("/dashboard")
        }
    }, [token, navigate])

    if (token) return null;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="bg-white rounded-lg p-2 text-center w-200 h-max px-4">
                <Heading label={"Sign In"}></Heading>
                <SubHeading label={"Enter your credentials to access your account"}></SubHeading>
                <InputBox label={"Email"} placeholder={"shrey@gmail.com"} onChange={e => setUsername(e.target.value)}></InputBox>
                <InputBox label={"Password"} placeholder={"your password"} onChange={e => setPassword(e.target.value)}></InputBox>
                <div className="pt-4">
                    <Button label={"Sign In"} onClick={ async () => {

                        try{
                            const res = await axios(
                                {
                                    url:"http://localhost:3000/api/v1/user/signin",
                                    method:"POST",
                                    data: {
                                        username: username,
                                        password: password
                                    }
                                }
                            )
                            const token = res.data.token;
                            localStorage.setItem("token",token);
                            navigate("/dashboard")
                        } catch (e) {
                            alert("Incorrect Username/Password")
                        }
                    }}></Button>
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to="/signup"></BottomWarning>
            </div>
        </div>
    </div>
}