import { FormEvent } from "react";
import YouTube, { YouTubeProps } from "react-youtube";


const YoutubeVideo = () => {

    
    const opts: YouTubeProps['opts'] = {
        width: '100%',
        height: '100%',
        playerVars: {
            autoplay: '1'
        }
    };

    return <YouTube videoId={'5cXn0aMtHe0'} opts={opts}  style={{height: '100%'}} />
}

export default YoutubeVideo