import React, { useContext, useEffect, useState } from "react";
import { AudioContext } from "../../context/AudioContext";
import { IconButton, Slider } from "@mui/material";
import { Pause, PlayArrow, SkipNext, SkipPrevious } from "@mui/icons-material";
import secondsToMMSS from "../../utils/secondsToMMSS";
import tracksList from "../../assets/tracksList";

export const TimeControls = (props) => {
    const {audio, currentTrack, setCurrentTrack, setPlaying} = useContext(AudioContext)
    const {duration} = currentTrack
    const [currentTime, setCurrentTime] = useState(0)
    const formattedCurrentTime = secondsToMMSS(currentTime)
    const sliderCurrentTime = Math.round((currentTime / duration) * 10000)

    const handlerChangeCurrentTime = (_, value) => {
        const time = Math.round((value / 10000) * duration)
        setCurrentTime(time)
        audio.currentTime = time
    }

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurrentTime(audio.currentTime)
        }, 1)

        return () => {
            clearInterval(timeInterval)
        }
    }, [])

    useEffect(() => {
        const timeInterval = setInterval(() => {
            if(audio.currentTime === audio.duration){
                let index = tracksList.findIndex(obj => obj.id === currentTrack.id);
                let newIndex = index + 1;
                if(tracksList.length > newIndex){
                    setCurrentTrack(tracksList[newIndex])
                    setPlaying(true)

                    audio.src = tracksList[newIndex].src
                    audio.currentTime = 0
                    audio.play()
                } else {
                    setPlaying(false)
                }
            }
        }, 1000)

        return () => {
            clearInterval(timeInterval)
        }
    }, [currentTrack])

    return (
        <>
            <p className={props.cl}>{formattedCurrentTime}</p>
                <Slider 
                    step={1} 
                    min={0} 
                    max={10000} 
                    value={sliderCurrentTime}
                    onChange={handlerChangeCurrentTime} color="primary">
                </Slider>
        </>
    )
}

const Playbar = (props) => {
    const {currentTrack, handlerToggleAudio, isPlaying, handlerNextAudio, handlerPrevAudio} = useContext(AudioContext)
    const {title, artists, preview, duration} = currentTrack
    const formattedDuration = secondsToMMSS(duration)

    return (
        <div className={'playbar'}>
            <img className={'preview'} src={preview} alt=""></img>
            <div className={'playbar-cc'}>
                <div className={'playbar-controls'}>
                    <IconButton onClick={() => handlerPrevAudio(currentTrack)}>
                        <SkipPrevious></SkipPrevious>
                    </IconButton>
                    <IconButton onClick={() => handlerToggleAudio(currentTrack)}>
                        {isPlaying ? <Pause></Pause> : <PlayArrow></PlayArrow>}
                    </IconButton>
                    <IconButton onClick={() => handlerNextAudio(currentTrack)}>
                        <SkipNext></SkipNext>
                    </IconButton>
                </div>
                <div className={'playbar-credits'} onClick={() => props.openModal()}>
                    <h4 className={'playbar-title'}>{title}</h4>
                    <p className={'playbar-artists'}>{artists}</p>
                </div>
            </div>
            <div className={'playbar-slider'}>
                <TimeControls cl={'playbar-actual-time'}></TimeControls>
                <p className={'playbar-duration'}>{formattedDuration}</p>
            </div>
        </div>
    )
}

export default Playbar