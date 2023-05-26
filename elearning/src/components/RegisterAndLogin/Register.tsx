import LoginSignupCover from "./LoginSignupCover"
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from 'zod';
import { registerInterface } from "../Hooks/interfaces";
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from "react-query";
import axios from "axios";
import { addUser } from "../../hooks/api";
import { AxiosError } from "axios";
import ShowError from "../ShowError/ShowError";
import UseContextState from "../../hooks/UseELearningContext";
import { Link, useNavigate } from "react-router-dom";
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{5,30}$/

const Register = () => {
    const navigate = useNavigate();
    const { error, setError } = UseContextState();
    const schema: ZodType<registerInterface> = z.object({
        username: z.string().min(5).max(30),
        email: z.string().email(),
        password: z.string().min(5).max(30)
        .regex(PASSWORD_REGEX, 
            {message: 'Must include uppercase and lowercase letters. \n Must include a number and a special character.\n Special characters allowed: ! @ # $ %.'
        }),
        confirmPassword: z.string().min(5).max(30)
        }).refine((data) => data.password === data.confirmPassword, {
            message: "Confirm password doesn't match password",
            path: ['confirmPassword']
        })
    const { register, handleSubmit, formState: { errors, isValid }, reset, } = useForm<registerInterface>({resolver: zodResolver(schema)})
    const mutationSubmit = useMutation(addUser, {
        onSuccess: () => {
            reset()
            setError('');
            navigate('/login')
        },
        onError: (error: Error | AxiosError) => {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.message);
            }
        }
    })

    const submitData = (data: registerInterface) => {      
        try { 
            mutationSubmit.mutate(data)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <LoginSignupCover>
            <form onSubmit={handleSubmit(submitData)} className="flex flex-col space-y-4 justify-center">
                <span className="text-black font-bold text-2xl">Register</span>
                <span className="text-[#96949F] font-bold text-sm">Online learing platform</span>
                <div className="flex flex-col space-y-5">
                    {
                        error && 
                        <ShowError error={error} />
                    }
                    <div className="flex flex-col space-y-1">
                        <label htmlFor='username' className="text-black font-medium text-sm">Username*</label>
                        <input type='text' id='username' className="outline-none border-[#E3E2ED] border  py-2 placeholder:text-xs px-4 placeholder:font-medium rounded-3xl" placeholder="Username" {...register('username')}/>
                        {errors.username && <span  className="text-sm font-medium">{errors.username.message}</span>}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor='email' className="text-black font-medium text-sm">Email*</label>
                        <input type='text' id='email' className=" outline-none border-[#E3E2ED] border  py-2 placeholder:text-xs px-4 placeholder:font-medium rounded-3xl" placeholder="Email" {...register('email')} />
                        {errors.email && <span  className="text-sm font-medium">{errors.email.message}</span>}

                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor='password' className="text-black font-medium text-sm">Password*</label>
                        <input type='password' id='password' className=" outline-none border-[#E3E2ED] border  py-2 placeholder:text-xs px-4 placeholder:font-medium rounded-3xl" placeholder="Email" {...register('password')} />
                        {errors.password && <span  className="text-sm font-medium">{errors.password.message}</span>}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor='confirmPassword' className="text-black font-medium text-sm">Confirm password*</label>
                        <input type='password' id='confirmPassword' className=" outline-none border-[#E3E2ED] border  py-2 placeholder:text-xs px-4 placeholder:font-medium rounded-3xl" placeholder="Email" {...register('confirmPassword')} />
                        {errors.confirmPassword && <span className="text-sm font-medium">{errors.confirmPassword.message}</span>}
                    </div>
                    <div>
                        <button className="bg-[#5138ED] w-full py-2 rounded-3xl text-white font-medium ">
                            Login
                        </button>
                    </div>
                    <div>
                        <span className="text-sm font-medium mr-2">Already registered?</span>
                        <Link to='/login' className="text-[#5138ED] font-medium text-sm">Login</Link>
                    </div>
                </div>
            </form>
        </LoginSignupCover>
    )
}

export default Register