import React, { useState } from "react"
import { Howl } from "howler"
import { useStaticQuery, graphql } from "gatsby"
import Info from "./info"

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const defaultHowl = {
  autoplay: false,
  loop: false,
  volume: 1,
}

const createHowl = src => {
  return new Howl({
    ...defaultHowl,
    src: src,
    loop: true
  })
}

const buttonStyle = {
  fontFamily: `'Roboto Condensed', sans-serif`,
  padding: `10px 20px`,
  textAlign: `center`,
  color: `#000000`,
  textTransform: `uppercase`,
  fontWeight: `600`,
  marginLeft: `10px`,
  marginBottom: `10px`,
  cursor: `pointer`,
  display: `inline-block`,
  backgroundColor: `transparent`,
  border: `3px solid #000000`,
  borderRadius: `50px`,
  transition: `all .15s ease-in-out`,
}
const Audio = () => {
  const data = useStaticQuery(graphql`
    {
      allFile(filter: { extension: { eq: "mp3" } }) {
        edges {
          node {
            publicURL
            name
          }
        }
      }
    }
  `)

  const [index, setIndex] = useState(getRandomInt(0, data.allFile.edges.length))
  const [playing, setPlaying] = useState(false)
  const [track, setTrack] = useState(null)
  const [info, setInfo] = useState(false)
  const [allHowls] = useState(
    data.allFile.edges.map(file => createHowl(file.node.publicURL))
  )
  const [randomX] = useState(data.allFile.edges.map(() => Math.random() * 100))
  const [randomY] = useState(data.allFile.edges.map(() => Math.random() * 100))

  const playAudio = audio => {
    try {
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
      const howlObj = audio
      howlObj.fade(howlObj.volume(), 0, 1000, track)
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
        background: `radial-gradient(circle at ${randomX[index]}% ${
          randomY[index]
        }%, #${data.allFile.edges[index].node.name.slice(
          data.allFile.edges[index].node.name.length - 6,
          data.allFile.edges[index].node.name.length
        )}, #ffffff)`,
        transition: `all 1000ms ease-in-out`,
      }}
    >
      <Info in={info} />
      <div style={{ margin: `0 auto`, width: `max-content` }}>
        <button style={buttonStyle} onClick={() => setInfo(!info)}>
          info
        </button>
        <button
          style={buttonStyle}
          onClick={() => {
            playing ? stopAudio(allHowls[index]) : playAudio(allHowls[index])
            setPlaying(!playing)
          }}
        >
          {playing ? "Stop" : "Play"}
        </button>
        <button
          style={buttonStyle}
          onClick={() => {
            const nextIndex =
              index + 1 === data.allFile.edges.length ? 0 : index + 1
            playing && stopAudio(allHowls[index])
            playing && playAudio(allHowls[nextIndex])
            setIndex(nextIndex)
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Audio
