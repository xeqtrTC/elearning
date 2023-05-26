import { mappedMessagesProps } from "../Hooks/interfaces"

const MappedMessages = ({ name, message, idOfRoom}: mappedMessagesProps) => {
    return (
        <div>
            <div className={`flex ${name === 'Admin' ? 'justify-end' : 'justify-start'}  text-black `}>
                <span>
                    {
                        idOfRoom ? (
                            name === 'Admin' ? 'You' : 'User'
                        ) : (
                            name === 'Admin' ? 'Admin' : 'You'
                        )
                    }
                </span>
            </div>
            <div className={`flex ${name === 'Admin' ? 'justify-end' : 'justify-start'}`}>
                <div className="bg-black px-5 py-2 rounded-[20px] break-all w-[80%] text-white">
                    <span>{message}</span>
                </div>
            </div>
        </div>
    )
}

export default MappedMessages