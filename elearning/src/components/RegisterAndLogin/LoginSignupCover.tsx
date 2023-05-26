import { ReactNode } from "react";
import { Outlet } from "react-router-dom"

type LayoutProps = {
    children: ReactNode;
  };
const LoginSignupCover: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="w-[70%] m-auto grid grid-cols-2 h-screen ">
            <div className=" py-14">
                <div className="flex items-center justify-center  h-full">
                        <div className="flex flex-col space-y-4 justify-center w-[50%]">
                            {children}
                        {/* <form onSubmit={loginUserFunction} className="flex flex-col space-y-4 justify-center">
                            <span className="text-black font-bold text-2xl">Login</span>
                            <span className="text-[#96949F] font-bold text-sm">Online learing platform</span>
                            <div className="flex flex-col space-y-5">
                                {
                                    error && 
                                    <ShowError error={error} />
                                }
                                <div className="flex flex-col space-y-1">
                                    <label htmlFor='username' className="text-black font-medium text-sm">Username*</label>
                                    <input id='username' type='text' name='username' onChange={onChangeValue} placeholder='username' value={data.username} className=" outline-none border-[#E3E2ED] border  py-2 placeholder:text-xs px-4 placeholder:font-medium rounded-3xl" />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <label htmlFor='password' className="text-black font-medium text-sm">Password*</label>
                                    <input id='password' type='password' name='password' onChange={onChangeValue} placeholder='password' value={data.password} className="outline-none border-[#E3E2ED] border  py-2 placeholder:text-xs px-4 placeholder:font-medium rounded-3xl" />
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
                    </form> */}
                        </div>
                </div>
                

            </div>
            <div className="bg-[#5138ED] py-14 text-white">
                <span>something fancy</span>
            </div>
        </div>
    )
}

export default LoginSignupCover