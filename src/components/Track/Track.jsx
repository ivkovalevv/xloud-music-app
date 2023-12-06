import React, { useContext } from "react";
import { AudioContext } from "../../context/AudioContext";
import { IconButton } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import secondsToMMSS from "../../utils/secondsToMMSS";

const Track = (track) => {
    const {id, src, preview, title, artists, duration} = track

    const { handlerToggleAudio, currentTrack, isPlaying} = useContext(AudioContext)
    
    const isCurrentTrack = currentTrack.id === track.id

    const formattedDuration = secondsToMMSS(duration)

    return (
        <div className={isCurrentTrack ? 'track playing' : 'track'}> 
            <IconButton onClick={() => handlerToggleAudio(track)}>
                {isCurrentTrack && isPlaying ? <Pause></Pause> : <PlayArrow></PlayArrow>}
            </IconButton>
            <img className={'preview'} src={preview} alt=""></img>
            <div className={'credits'}>
                <b>{title}</b>
                <p>{artists}</p>
            </div>
            <p>{formattedDuration}</p>
        </div>
    )
}

export default Track