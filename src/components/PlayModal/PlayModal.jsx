import React, { useContext } from "react";
import { AudioContext } from "../../context/AudioContext";
import { IconButton, Slider } from "@mui/material";
import { Pause, PlayArrow, SkipNext, SkipPrevious } from "@mui/icons-material";
import secondsToMMSS from "../../utils/secondsToMMSS";
import { TimeControls } from "../Playbar/Playbar";

const PlayModal = (props) => {
    const {currentTrack, handlerToggleAudio, isPlaying, handlerNextAudio, handlerPrevAudio} = useContext(AudioContext);
    const {title, artists, preview, duration} = currentTrack;
    const formattedDuration = secondsToMMSS(duration);
    let cl = 'actual-time';

    return (
        <div className="overline" onClick={() => props.nonVisible()}>
            <div className={'playmodal'} onClick={(e) => e.stopPropagation()}>
            <img className={'modal-image'} src={preview} alt=""></img>
            <div className={'modal-credits'}>
                <h4>{title}</h4>
                <p>{artists}</p>
            </div>
            <div className={'modal-slider'}>
                <TimeControls cl={cl}></TimeControls>
                <p className={'modal-duration'}>{formattedDuration}</p>
            </div>
            <div className={'modal-controls'}>
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
        </div>
        </div>
    )
}

export default PlayModal