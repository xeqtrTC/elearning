import { errorStatusProps } from "../Hooks/interfaces"

const DoesntExist = ({ errorNotAllowed }: errorStatusProps) => {
    return (
        <div className="h-screen  relative p-10">
            <div className="flex justify-center">
                <p className="font-bold text-3xl">
                    {
                        errorNotAllowed === 401 ? (
                            "Please purchase this course"
                        ) : (
                            "Sorry, we couldn't find that page"
                        )
                    }
                </p>
            </div>
            <div className="absolute bottom-4 p-">09</div>
        </div>
    )
}

export default DoesntExist