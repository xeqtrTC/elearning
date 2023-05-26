import { createContext, ReactElement, useState } from "react";




const ELearningContext = () => {
    const [error, setError] = useState<string>('');
    const [lessonIDtoBeGiven, setLessonIDtoBeGiven] = useState<number | null>(null);
    const [showYoutubeVideo, setShowYoutubeVideo] = useState<boolean>(false)
    
    return { error, setError, lessonIDtoBeGiven, setLessonIDtoBeGiven, showYoutubeVideo, setShowYoutubeVideo };
}

export type UseContextType = ReturnType<typeof ELearningContext>

const initState: UseContextType = {
    error: '',
    showYoutubeVideo: false,
    setError: () => {},
    lessonIDtoBeGiven: 0,
    setLessonIDtoBeGiven: () => {},
    setShowYoutubeVideo: () => {}
}
const ContextStateAPI = createContext<UseContextType>(initState);
type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ContextStateProvider = ({ children }: ChildrenType ): ReactElement  => {
    return (
        <ContextStateAPI.Provider value={ELearningContext()}>
            {children}
        </ContextStateAPI.Provider>
    )
}

export default ContextStateAPI