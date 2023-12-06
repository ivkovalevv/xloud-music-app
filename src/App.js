import React, { useState } from "react"
import MainPage from "./pages/MainPage/MainPage"
import './App.css';
import Playbar from "./components/Playbar/Playbar"
import PlayModal from "./components/PlayModal/PlayModal";

const App = () => {
  const [stateModal, setStateModal] = useState(false)

  const openModal = () => {
    setStateModal(true)
  }

  const nonVisible = () => {
    setStateModal(false)
  }

  return (
    <div className={'wrapper'}>
      <MainPage></MainPage>
      <Playbar openModal={openModal}></Playbar>
      {
        stateModal ? <PlayModal nonVisible={nonVisible}></PlayModal> : <></>
      }
    </div>
  )
}

export default App
