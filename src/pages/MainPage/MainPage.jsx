import React, { useState } from "react"
import tracksList from "../../assets/tracksList"
import Track from "../../components/Track/Track"
import { Input } from "@mui/material"

const runSearch = (query) => {
    if(!query){
        return tracksList
    }

    const lowerCaseQuery = query.toLowerCase()

    return tracksList.filter((track) => 
    track.title.toLowerCase().includes(lowerCaseQuery) || 
    track.artists.toLowerCase().includes(lowerCaseQuery)
    )

}

const MainPage = () => {
    const [tracks, setTracks] = useState(tracksList)

    const handlerChange = (event) => {
        const foundTracks = runSearch(event.target.value)
        setTracks(foundTracks)
    }

    return (
        <div className={'search'}>
            <Input 
                className={'input'} 
                placeholder="Поиск треков" 
                onChange={handlerChange}>
            </Input>
            <div className={'list'}>
                {tracks.map((track) => 
                    <Track key={track.id} {...track}></Track>
                )}
            </div>
        </div>
    )
}

export default MainPage