import { Dispatch, SetStateAction } from "react"
import { socket } from "./LiveMessages"

interface SendMessageState {
    message: string,
    idOfRoom: string,
    setMessage: Dispatch<SetStateAction<string>>
}
const SendMessages = ({ message, idOfRoom, setMessage }: SendMessageState) => {
    const onFocusFunction = () => {
        const data = {
            idOfRoom: idOfRoom,
            typing: true,
            name: 'User'
        }
        socket.emit('input_typing', data)
    }
    const onBlurFunction = () => {
        const data = {
            idOfRoom: idOfRoom,
            typing: false,
            name: 'User'
        }
        socket.emit('input_typing', data)
    }
    return (
        <div className="flex space-x-2">
            <input 
            type='text' 
            placeholder="Send your message" 
            value={message} 
            onFocus={onFocusFunction}
            onBlur={onBlurFunction}
            className="inputEditUser w-full"  
            onChange={(e) => setMessage(e.target.value)} 
            // ref={messageRef}
            />
            <button className="bg-red-600  rounded-xl text-white text-medium px-5" >acab</button>
        </div>
    )
}

export default SendMessages