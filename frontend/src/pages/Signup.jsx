import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useEffect, useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom"

export const Signup = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            alert("You are already logged in")
            navigate("/dashboard")
        }
    }, [navigate, token])

    if (token) return null;

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center w-full max-w-[450px]">
            <div className="rounded-lg bg-white w-200 text-center p-2 h-max px-4">
                <Heading label={"Sign Up"}></Heading>
                <SubHeading label={"Enter your information to create an account"}></SubHeading>
                <InputBox label={"First Name"} placeholder={"Shrey"} onChange={e => setFirstName(e.target.value)}></InputBox>
                <InputBox label={"Last Name"} placeholder={"Tarsaria"} onChange={e => setLastName(e.target.value)}></InputBox>
                <InputBox label={"Email"} placeholder={"shrey@gmail.com"} onChange={e => setEmail(e.target.value)}></InputBox>
                <InputBox label={"Password"} placeholder={"Strong Password"} onChange={e => setPassword(e.target.value)}></InputBox>
                <div className="pt-4" >
                    <Button label={"Sign Up"} onClick={async () => {
                        const results = await axios(
                            {
                                url:"http://localhost:3000/api/v1/user/signup",
                                method: "POST",
                                headers: {},
                                data: {
                                    username: email,
                                    password: password,
                                    firstName: firstName,
                                    lastName: lastName
                                }
                            }
                        )

                        const token = results.data.token;

                        if (token) {
                            localStorage.setItem("token", token)
                            navigate("/dashboard")
                        }
                    }}></Button>
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to="/signin"></BottomWarning>
            </div>
        </div>
    </div>
}