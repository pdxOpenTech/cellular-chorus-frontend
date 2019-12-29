import React, { useState } from "react"
import { Howl } from "howler"
import { useStaticQuery, graphql } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"

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
const buttonStyle = {
  fontFamily: `'Roboto Condensed', sans-serif`,
  width: `170px`,
  paddingTop: `30px`,
  paddingBottom: `30px`,
  textAlign: `center`,
  color: `#000000`,
  textTransform: `uppercase`,
  fontWeight: `600`,
  marginLeft: `30px`,
  marginBottom: `30px`,
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

  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [track, setTrack] = useState(null)
  const [allHowls] = useState(
    data.allFile.edges.map(file => createHowl(file.node.publicURL))
  )

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
        backgroundColor: `#${data.allFile.edges[index].node.name}`,
      }}
    >
      <AniLink fade to="info">
        <button style={buttonStyle}>info</button>
      </AniLink>
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
  )
}

export default Audio
