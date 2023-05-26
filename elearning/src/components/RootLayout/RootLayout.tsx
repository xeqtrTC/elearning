import { Outlet } from "react-router-dom"
import UseContextState from "../../hooks/UseELearningContext"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import { BsChatText } from 'react-icons/bs'
import YoutubePreview from "../YoutubePreview/YoutubePreview"
import { Fragment, useState } from "react"
import LiveMessages, { socket } from "../LiveMessages/LiveMessages"
import { v4 } from "uuid"


const RootLayout = () => {
    const { showYoutubeVideo } = UseContextState();
    const [showLiveMessages, setShowLiveMessages] = useState<boolean>(false);
    const [idOfRoom, setIdOfRoom] = useState<string>('');
    let youtubeButton;
    let showLiveMessagesButton = null;
    const fuunctionTobesendacab = () => {
        const data = {
            id: v4()
        }
        setShowLiveMessages(prevValue => !prevValue);
        setIdOfRoom(data.id);
        socket.emit('join_room', data);
    }
    if(showYoutubeVideo) {
        youtubeButton = (
            <YoutubePreview />
        )
    }
    if (showLiveMessages) {
        showLiveMessagesButton = (
            <div className="fixed right-0 bottom-0 p-10 z-50" >
                <LiveMessages idOfRoom={idOfRoom} />
            </div>
        )
    } else {
        showLiveMessagesButton = (
            <div className="fixed right-0 bottom-0 p-10 z-50" >
                <BsChatText 
                className="w-8 h-8 text-[#5138ED] cursor-pointer hover:scale-110 transitionOverlay"
                onClick={fuunctionTobesendacab}  
                
                />
            </div>
        )
    }
    const combinedButtons = (
        <>
        {youtubeButton}
        </>
    )
    return (
        <Fragment>
            {combinedButtons}
            <div>
                {showLiveMessagesButton}
                <Header />
                <div>
                    <Outlet />
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </Fragment>
    )
}

export default RootLayout