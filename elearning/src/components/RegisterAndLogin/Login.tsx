import { Link } from "react-router-dom"
import axios, { AxiosError } from "axios";
import { FC, FormEvent, useState } from "react"
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../hooks/api";
import UseAuthContext from "../../hooks/authUseContext";
import UseContextState from "../../hooks/UseELearningContext";
import { loginInterface } from "../Hooks/interfaces";
import ShowError from "../ShowError/ShowError";
import LoginSignupCover from "./LoginSignupCover";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
    const { error, setError } = UseContextState()
    const navigate = useNavigate();
    const { setAuthStats } = UseAuthContext();
    const loginSchema: ZodType<loginInterface> = z.object({
        username: z.string().nonempty(),
        password: z.string().nonempty()
    })
    const [data, setData] = useState<loginInterface>({
        username: '',
        password: '',
    })
    const { register, handleSubmit } = useForm<loginInterface>({resolver: zodResolver(loginSchema)})
    const onChangeValue = (e: FormEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setData((prevValue) => ({...prevValue, [name]: value}))
    }
    const loginMutation = useMutation(loginUser, {
        onSuccess: (data) => {
            const { username, email, roles, id } = data.data
            // setAuthStats({
            //     id: id,
            //     username: username,
            //     email: email,
            //     roles: roles
            // })
            navigate('/')
        },
        onError: (error: Error | AxiosError) => {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message)
            }
        }     
    })
    const loginUserFunction = (data: loginInterface) => {
        console.log(data);
        try {
            loginMutation.mutate(data)
        } catch (error) {

        }
    }
    
    return (
        <LoginSignupCover>
            <form onSubmit={handleSubmit(loginUserFunction)} className="flex flex-col space-y-4 justify-center">
                <span className="text-black font-bold text-2xl">Login</span>
                <span className="text-[#96949F] font-bold text-sm">Online learing platform</span>
                <div className="flex flex-col space-y-5">
                    {
                        error && 
                        <ShowError error={error} />
                    }
                    <div className="flex flex-col space-y-1">
                        <label htmlFor='username' className="text-black font-medium text-sm">Username*</label>
                        <input 
                        id='username' 
                        type='text' 
                        placeholder='username' 
                        className=" outline-none border-[#E3E2ED] border  py-2 placeholder:text-xs px-4 placeholder:font-medium rounded-3xl" 
                        {...register('username')} 
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor='password' className="text-black font-medium text-sm">Password*</label>
                        <input 
                        id='password' 
                        type='password' 
                        placeholder='password' 
                        className="outline-none border-[#E3E2ED] border  py-2 placeholder:text-xs px-4 placeholder:font-medium rounded-3xl" 
                        {...register('password')}  
                        />
                    </div>
                    <div className="flex justify-end">
                        <span className="text-[#5138ED] text-xs font-bold" >Forget password?</span>
                    </div>
                    <div>
                        <button className="bg-[#5138ED] w-full py-2 rounded-3xl text-white font-medium ">
                            Login
                        </button>
                    </div>
                    <div>
                        <span className="text-sm font-medium mr-2">Not registered yet?</span>
                        <Link to='/signup' className="text-[#5138ED] font-medium text-sm">Create an account</Link>
                    </div>
                </div>
            </form>
        </LoginSignupCover>
        
    )
}

export default Login