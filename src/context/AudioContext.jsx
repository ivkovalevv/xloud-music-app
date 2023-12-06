import { createContext, useState } from "react";
import tracksList from "../assets/tracksList";

const audio = new Audio()

export const AudioContext = createContext({})

const AudioProvider = ({children}) => {
    const [currentTrack, setCurrentTrack] = useState(tracksList[0])
    const [isPlaying, setPlaying] = useState(false)

    const handlerToggleAudio = (track) => {
        if(currentTrack.id !== track.id){
            setCurrentTrack(track)
            setPlaying(true)

            audio.src = track.src
            audio.currentTime = 0
            audio.play()

            return;
        }

        if(isPlaying){
            audio.pause();
            setPlaying(false)
        } else {
            audio.play();
            setPlaying(true)
        }
    }

    const handlerNextAudio = (track) => {
        let index = tracksList.findIndex(obj => obj.id === track.id);
        let newIndex = index + 1;
        if(tracksList.length > newIndex){
            setCurrentTrack(tracksList[newIndex])
            setPlaying(true)

            audio.src = tracksList[newIndex].src
            audio.currentTime = 0
            audio.play()
        } else {
            return
        }
    }

    const handlerPrevAudio = (track) => {
        let index = tracksList.findIndex(obj => obj.id === track.id);
        let newIndex = index - 1;
        if(newIndex >= 0){
            setCurrentTrack(tracksList[newIndex])
            setPlaying(true)

            audio.src = tracksList[newIndex].src
            audio.currentTime = 0
            audio.play()
        } else {
            return
        }
    }

    const value = {audio, currentTrack, setCurrentTrack, isPlaying, setPlaying, handlerToggleAudio, handlerNextAudio, handlerPrevAudio}

    return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}

export default AudioProvider