import { HiOutlineMinus } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai';
import io from 'socket.io-client';
import { useMutation } from 'react-query';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { liveMessagesProps } from '../Hooks/interfaces';
import MessagesDiv from './MessagesDiv';
import Typing from './Typing';
import SendMessages from './SendMessages';
import UseContextState from '../../hooks/UseELearningContext';
import ShowError from '../ShowError/ShowError';

export const socket_url = 'http://localhost:5000'
export const socket = io(socket_url)

const LiveMessages = ({ idOfRoom }: liveMessagesProps) => {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<{ idOfRoom: string; message: string; name: string }[]>([]);
    const { error, setError } = UseContextState();
    const [typingValue, setTypingValue] = useState<{idOfRoom: string, typing: boolean, name: string}>({
        idOfRoom: '',
        typing: false,
        name: '',
    });
    const messageRef = useRef<HTMLInputElement>(null);
    
    const sendMessageFunction = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            name: 'Guest',
            idOfRoom: idOfRoom,
            message: message
        }
        try {
            if (message) {
                socket.emit('send_message', data)
                setMessage('');
            }
        } catch (error) {
            console.log(error);
        }
        
    }
    useEffect(() => {
        messageRef?.current?.focus();
    }, [messageRef])

    useEffect(() => {
        socket.on('user_focus', (data) => {
            console.log(data);
            setTypingValue(data);
        })
    }, [])
    useEffect(() => {
            socket.on('receive_private_messages', (data) => {
                console.log(data);
                setMessages((prevValue) => [...prevValue, data])
            })        
        return () => {
            socket.disconnect();
        };
    }, [])
    useEffect(() => {
        socket.on('error_message', (data) => {
            console.log(data)
            setError(data);
        })
    }, [])
    return (
        <div className="bg-white md:w-[30rem]  border rounded-xl p-2 ">
            <form onSubmit={sendMessageFunction}>
                <div className='flex justify-end py-3 space-x-5'>
                    <HiOutlineMinus className='w-5 h-5 hover:scale-110 transitionOverlay cursor-pointer' />
                    <AiOutlineClose className='w-5 h-5 hover:scale-110 transitionOverlay cursor-pointer'/>
                </div>
                {
                    error && (
                        <div className='py-1'>
                            <ShowError error={error} />
                        </div>
                    )
                }
                <div className="p-5 h-[30rem]  text-white space-y-2 text-medium  overflow-hidden overflow-y-scroll"> 
                    <MessagesDiv messages={messages} />
                    {
                        typingValue.typing === true ? (
                            <Typing />
                        ) : null
                    }
                </div>
                <SendMessages message={message} setMessage={setMessage} idOfRoom={idOfRoom} />
            </form>
        </div>
    )
}

export default LiveMessages 