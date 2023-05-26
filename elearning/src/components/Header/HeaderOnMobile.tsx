import HeaderLinks from "./HeaderLinks"

const HeaderOnMobile = () => {
    return (
        <div className="h-screen fixed inset-0  left-0 w-full  bg-white/70 z-[100] py-5 ">
            <div className="py-16 flex justify-center">
                <div>
                    <HeaderLinks row={false} />
                    
                </div>
            </div>
        </div>
    )
}

export default HeaderOnMobile