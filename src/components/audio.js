import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import { Howl } from "howler"
import airtable from "../content/airtable.json"

const defaultHowl = {
  autoplay: false,
  loop: false,
  volume: 1,
}

const createHowl = src => {
  return new Howl({
    ...defaultHowl,
    src: src,
  })
}

const allHowls = airtable.records.map(audio =>
  createHowl(audio.fields.audioFile[0].url)
)

const Audio = () => {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [track, setTrack] = useState(null)

  const playAudio = audio => {
    try {
      console.log("starting", audio)
      const howlObj = audio
      const howlId = howlObj.play()
      setTrack(howlId)
    } catch (error) {
      // eslint-disable-next-line
      console.warn("Unknown SFX theme requested to play ")
    }
  }

  const stopAudio = audio => {
    try {
      console.log("stopping", audio)
      const howlObj = audio
      howlObj.fade(howlObj.volume(), 0, 750, track)
    } catch (error) {
      // eslint-disable-next-line
      console.warn("Unknown SFX theme requested to stop ")
    }
  }

  return (
    <div
      style={{
        margin: `0 auto`,
        minHeight: `100vh`,
        padding: `1.45rem 1.0875rem`,
        backgroundColor: `#${airtable.records[index].fields.hexCode}`,
      }}
    >
      <button
        onClick={() => {
          playing ? stopAudio(allHowls[index]) : playAudio(allHowls[index])
          setPlaying(!playing)
        }}
      >
        {playing ? "Stop" : "Play"}
      </button>
      <button
        onClick={() => {
          const nextIndex =
            index + 1 === airtable.records.length ? 0 : index + 1
          playing && stopAudio(allHowls[index])
          playing && playAudio(allHowls[nextIndex])
          setIndex(nextIndex)
        }}
      >
        Next
      </button>
    </div>
  )
}

export default Audio
