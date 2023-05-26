import { useEffect, useRef } from "react";
import { messageArrayProps, messageProps } from "../Hooks/interfaces"
import MappedMessages from "./MappedMessages";

const MessagesDiv = ({ messages, idOfRoom }: messageArrayProps) => {
    const messageRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        messageRef?.current?.scrollIntoView({ behavior: 'smooth'})
    }, [messages])
    return (
            <>
            {
                messages?.map((item, index) => {
                    const { name, message, idOfRoom: idOfRoomNormal} = item;
                    return (
                        <div ref={messageRef}>
                            <MappedMessages name={name} message={message} key={idOfRoomNormal}  />
                        </div>
                    )
                })
            }
            </>
    
    )
}

export default MessagesDiv