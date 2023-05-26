import { useEffect, useState } from "react";
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import Loading from "../Loading/Loading";

const DoesntExistPage = () => {
    let content = null;
    const [isLoading ,setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000)
        return () => clearTimeout(timer)
    }, [])
    if(isLoading) {
        content = <Loading />
    } else {
        content = (
            <div>
                <Header />

                <div className="flex justify-center py-10">
                    <div className="">
                        <div className="py-5 text-center">
                            <span className="text-2xl font-medium">This page doesn't exist</span>   
                        </div>
                        <div className="w-[30rem] h-[30rem]">
                            <img src='https://cdn.pixabay.com/photo/2021/07/21/12/49/error-6482984_960_720.png' className="object-cover" />

                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        )
    }
    return <>{content}</>
}

export default DoesntExistPage