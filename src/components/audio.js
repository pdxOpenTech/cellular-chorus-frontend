import React, { useState } from "react"
import { Howl } from "howler"
import { useStaticQuery, graphql } from "gatsby"
import {
  PlayArrow,
  SkipNext,
  SkipPrevious,
  Info,
  Pause,
  BlurOn,
} from "@material-ui/icons"
import { Grid, NativeSelect, createMuiTheme, ThemeProvider } from "@material-ui/core"
import InfoOverlay from "./info"

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}

const defaultHowl = {
  autoplay: false,
  loop: false,
  volume: 1,
  preload: false,
  pool: 40,
}

const createHowl = src => {
  return new Howl({
    ...defaultHowl,
    src: src,
    loop: true,
  })
}

const buttonStyle = {
  padding: `10px 10px 0.4rem 10px`,
  textAlign: `center`,
  color: `#000000`,
  fontWeight: `600`,
  cursor: `pointer`,
  display: `inline-block`,
  backgroundColor: `transparent`,
  border: `3px solid transparent`,
  transition: `all .15s ease-in-out`,
  "&:hover": {
    color: "blue !important",
  },
}

const trackStyle = {
  padding: `10px 10px`,
  textAlign: `center`,
  color: `#000000`,
  fontWeight: `600`,
  display: `inline-block`,
  backgroundColor: `transparent`,
  border: `3px solid transparent`,
  transition: `all .15s ease-in-out`,
  fontSize: `1.25rem`,
  verticalAlign: `top`,
}

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Avenir Next",
      "Helvetica Neue",
      "Segoe UI",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
  },
})

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
  const totalTracks = data.allFile.edges.length

  const [index, setIndex] = useState(getRandomInt(0, totalTracks))
  const [playing, setPlaying] = useState(false)
  const [track, setTrack] = useState(null)
  const [info, setInfo] = useState(false)
  const [loading, setLoading] = useState("")
  const [allHowls] = useState(
    data.allFile.edges.map(file => createHowl(file.node.publicURL))
  )
  const [randomX] = useState(data.allFile.edges.map(() => Math.random() * 100))
  const [randomY] = useState(data.allFile.edges.map(() => Math.random() * 100))

  const playAudio = audio => {
    try {
      const howlObj = audio
      howlObj.once("load", () => setLoading("loaded"))
      const loadingStatus = howlObj.state()
      if (loadingStatus !== "loaded") howlObj.load()
      stateAudio(audio)
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

  const stateAudio = audio => {
    try {
      const howlObj = audio
      const isLoading = howlObj.state()
      setLoading(isLoading)
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
      }}
    >
      <InfoOverlay in={info} />
      <div style={{ margin: `0 auto`, width: `max-content` }}>
        <Grid container direction="row" alignItems="center" justify="center">
          <Grid item>
            <button style={buttonStyle} onClick={() => setInfo(!info)}>
              <Info />
            </button>
          </Grid>
          <Grid item>
            <button
              style={buttonStyle}
              onClick={() => {
                const nextIndex = index - 1 === -1 ? totalTracks - 1 : index - 1
                playing && stopAudio(allHowls[index])
                playing && playAudio(allHowls[nextIndex])
                setIndex(nextIndex)
              }}
            >
              <SkipPrevious />
            </button>
          </Grid>
          <Grid item>
            {" "}
            <button
              style={buttonStyle}
              onClick={() => {
                playing
                  ? stopAudio(allHowls[index])
                  : playAudio(allHowls[index])
                setPlaying(!playing)
              }}
            >
              {playing ? (
                loading !== "loaded" ? (
                  <BlurOn />
                ) : (
                  <Pause />
                )
              ) : (
                <PlayArrow />
              )}
            </button>
          </Grid>
          <Grid item>
            <button
              style={buttonStyle}
              onClick={() => {
                const nextIndex = index + 1 === totalTracks ? 0 : index + 1
                playing && stopAudio(allHowls[index])
                playing && playAudio(allHowls[nextIndex])
                setIndex(nextIndex)
              }}
            >
              <SkipNext />
            </button>
          </Grid>
          <Grid item>
            <ThemeProvider theme={theme}>
              <NativeSelect
                style={trackStyle}
                value={`#${("0" + (index + 1)).slice(-2)}`}
                onChange={event => {
                  const nextIndex = parseInt(event.target.value.slice(1)) - 1
                  playing && stopAudio(allHowls[index])
                  playing && playAudio(allHowls[nextIndex])
                  setIndex(nextIndex)
                }}
                disableUnderline
              >
                {data.allFile.edges.map((el, idx) => (
                  <option>{`#${("0" + (idx + 1)).slice(-2)}`}</option>
                ))}
              </NativeSelect>
            </ThemeProvider>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Audio
