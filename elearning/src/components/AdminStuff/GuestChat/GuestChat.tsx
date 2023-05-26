import { createRef, FormEvent, useCallback, useEffect, useRef, useState } from "react"
import { getAllLiveMessagesQuery, getAllLiveRoomsQuery } from "../../../hooks/query";
import { activeChatFirstProps, activeChatProps, mappedMessagesProps, testpropsplease } from "../../Hooks/interfaces"
import { socket } from "../../LiveMessages/LiveMessages"
import MessagesDiv from "../../LiveMessages/MessagesDiv";
import Typing from "../../LiveMessages/Typing";
import { MdDeleteOutline } from 'react-icons/md'
import { removeAllChatsMutation, removeOneChatMutation } from "../../../hooks/mutate";
import { AxiosError } from "axios";


interface Message {
  id: string;
  message: string;
  name: string;
  idOfRoom: string;
}

interface ChatRoom {
  [key: string]: Message[];
}

const GuestChat = () => {
    const [dataRooms, setDataRooms] = useState<{ idOfRoom: string, socketId: string, id:number}[]>([]);
    const [chatRooms, setChatRooms] = useState<ChatRoom>({});
    const [messages, setMessages] = useState<mappedMessagesProps[]>([]);
    const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
    const [typingValue, setTypingValue] = useState<{idOfRoom: string, typing: boolean, name: string}[]>([]);
    const [idOfRoom, setIdOfRoom] = useState<string>('')
    const listRefs = useRef<{ [socketId: string]: React.RefObject<HTMLInputElement> }>({});
    const { data, isLoading, isSuccess} = getAllLiveRoomsQuery();
    const { data: dataMessage, isLoading: isLoadingMessage, isSuccess: isSuccessMessage} = getAllLiveMessagesQuery();
    const { mutate: removeAllChatsMutate } = removeAllChatsMutation();
    const { mutate: removeOneChatMutate } = removeOneChatMutation();
    const removeOneChatFn = ({e, idOfRoom}: {e: FormEvent<HTMLButtonElement>, idOfRoom: string}) => {
      e.preventDefault();
      const dataToBeSent = {
        idOfRoom: idOfRoom
      }
      try {
        removeOneChatMutate(dataToBeSent)
      } catch (error: any) {
        console.log(error);
      }
    }
    const removeAllChatFn = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        removeAllChatsMutate();
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(() => {
      socket.on('active_chats', (data) => {
          setDataRooms(prevState => [...prevState, data]);
      });
    }, []);

    useEffect(() => {
      socket.on('new_active_chats', (data) => {
        if (dataRooms) {
          const filteredData = dataRooms?.filter((item) => item.socketId !== data.socketId)
          setDataRooms(filteredData); 
        }
      })
    }, [dataRooms])

    useEffect(() => {
      if(data && isSuccess) {
        console.log('usao u data', data)
        setDataRooms(data);
      }
    }, [data, isSuccess])
    useEffect(() => {
      if (dataMessage && isSuccessMessage) {
        console.log('res', 'USAO OVDE OPET')
        setMessages(dataMessage);
      }
    }, [dataMessage, isSuccessMessage])
    const onFocusFunction = (socketId: string) => {
      const data = {
        idOfRoom: socketId,
        typing: true,
        name: 'Admin'
      }
      socket.emit('input_typing', data)
    }
    const onBlurFunction = (socketId: string) => {
      const data = {
        idOfRoom: socketId,
        typing: false,
        name: 'Admin'
      }
      socket.emit('input_typing', data)
    }

    useEffect(() => {
      socket.on('receive_input_typing_focus', (data) => {
        let found = false;
        setTypingValue((item) => {
          const updatedarray = item.map((item) => {
            if (item.idOfRoom === data.idOfRoom) {
              found = true;
              return { ...item, typing: data.typing}
            }
            return item;
          })
          if(!found) {
            updatedarray.push({idOfRoom: data.idOfRoom, typing: data.typing, name: data.name })
          }
          return updatedarray
        })
      });
    }, []);
    
    const handleInputChange = (socketId: string, value: string) => {
      setInputValues((prevValues) => ({
        ...prevValues,
        [socketId]: value,
      }));
    };
    console.log(messages);

    const sendMessageToUser = useCallback((e: FormEvent<HTMLButtonElement>, idOfRoom: string) => {
      e.preventDefault();
      const data = {
          name: 'Admin',
          idOfRoom: idOfRoom,
          message: inputValues[idOfRoom]
      }   
      try {
          if (inputValues[idOfRoom]) {
            console.log(data);
              socket.emit('send_message', data)
              setInputValues((prevValues) => ({
                ...prevValues,
                [idOfRoom]: ''
              }))
          }
      } catch (error) {
          console.log(error);
      }
      
  }, [inputValues])
  
  useEffect(() => {
    socket.on('global_messager', (data) => {
      console.log(data, 'MESSAGE DATA');
      setMessages((prevValue) => [...prevValue, data])
    })
  }, [])

  const onClickChangeRef = (idOfRoom: string) => {
    // const dataToBeEmitted = {
    //   idOfRoom: idOfRoom
    // }
    // socket.emit('join_admin_room', dataToBeEmitted)
    // listRefs.current[idOfRoom].current?.focus();
  }
  let content;
  
    if (dataRooms.length > 0) {
      content = (
        <div>
          <form onSubmit={removeAllChatFn}>
            <div className="flex justify-between py-2 items-center">
                  <span className="font-bold text-xl">Delete every chat!</span>
                  <button><MdDeleteOutline className="w-7 h-7 cursor-pointer" /></button>
            </div>
            </form>
          <div className="responsiveGrid text-black">
            {
              dataRooms?.map((item) => {
                console.log(item, 'items')
                const { idOfRoom, socketId } = item
                return (
                  <div className="bg-black/20 p-5 rounded-xl " key={idOfRoom}>
                    {/* <form onSubmit={removeAllChatFn}> */}
                      <button onClick={(e) => removeOneChatFn({e, idOfRoom})}><MdDeleteOutline /></button>
                    {/* </form> */}
                    <div className="h-[10rem] overflow-hidden overflow-y-scroll">
                      {
                        messages.map((item, index) => {
                          console.log(item, 'message items');
                          const { message, idOfRoom: idOfRoomMessage, name } = item;
                          return (
                            idOfRoomMessage === idOfRoom && (
                              <div key={index} className='text-white'>
                                <p>{name}</p>
                                <p className="text-black">{message}</p>
                              </div>
                            )
                          )
                        })
                      }
                    </div>
                    {
                      typingValue.map((item) => {
                        const { idOfRoom: idOfRoomTyping, typing } = item
                        return (
                          idOfRoomTyping === idOfRoom && (
                            typing === true && (
                              <Typing />
                             )
                          )
                        )
                      })
                    }
                    <div className="flex items-center mt-2">
                      <input 
                        onChange={(e) => handleInputChange(idOfRoom, e.target.value)} 
                        value={inputValues[idOfRoom] || ''} 
                        type='text' 
                        onFocus={() => onFocusFunction(idOfRoom)}
                        onBlur={() => onBlurFunction(idOfRoom)}
                        placeholder="Send message to user"
                        className="inputAddInstructor "  
                        // ref={listRefs.current[idOfRoom]}
                        />
                        <button onClick={(e) => sendMessageToUser(e, idOfRoom)} className='bg-black text-white px-2 py-2 rounded-lg ml-2'>posalji</button>
                    </div>
                  </div>
                )
              })
            }
        </div>
        </div>
      );
    } else {
      content = <p>No active chats</p>;
    }
  
    return <>{content}</>;
  };

export default GuestChat