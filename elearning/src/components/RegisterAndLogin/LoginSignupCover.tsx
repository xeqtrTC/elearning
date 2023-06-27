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