import React from "react"
import ShareModal from "./share"

import { Share, OpenInNew } from "@material-ui/icons"
import { Grid, Modal, Fade, Backdrop } from "@material-ui/core"
import { Transition } from "react-transition-group"

const duration = 1000

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
}

const buttonStyle = {
  padding: `0`,
  textAlign: `center`,
  color: `#000000`,
  cursor: `pointer`,
  display: `inline-block`,
  backgroundColor: `transparent`,
  border: `3px solid transparent`,
  transition: `all .15s ease-in-out`,
  "&:hover": {
    color: "blue !important",
  },
  lineHeight: `0.95em`,
}

const infoStyle = {
  color: `#111111`,
  position: `absolute`,
  top: `0`,
  left: `0`,
  width: `100%`,
  height: `calc(100% - 6em)`,
  zIndex: `10`,
  padding: `2em 2em 0 2em`,
  marginTop: `4em`,
  background: `transparent`,
}

const linkStyle = {
  color: `black`,
  textDecoration: `none`,
}

const infoBox = {
  margin: `0 auto`,
  maxWidth: `800px`,
  overflow: `auto`,
  width: `100%`,
  height: `100%`,
  paddingRight: `17px`,
  boxSizing: `content-box`,
  letterSpacing: `0.065rem`,
  fontWeight: `300`,
  fontSize: `1em`,
  lineHeight: `1.45em`,
  letterSpacing: `0.085rem`
}

const spacing = {
  fontSize: `1.1em`,
  letterSpacing: `0.28rem`,
  fontWeight: `300`,
}

const titleStyle = {
  fontSize: `3.5em`,
  fontWeight: `100`,
  fontStyle: `italic`,
  textAlign: `left`,
  marginBottom: `1rem`,
  marginLeft: `-0.4rem`,
}

const titleSpacing = {
  letterSpacing: `0.10em`,
}

const authorStyle = {
  fontWeight: `300`,
  fontStyle: `italic`,
  letterSpacing: `0.1rem`,
}

const bodyStyle = {
  fontWeight: `200`,
  letterSpacing: `0.1rem`,
}

const Info = ({ in: inProp }) => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Transition in={inProp} timeout={duration}>
      {state => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <div style={infoStyle}>
            <div style={infoBox}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
              >
                <Grid item xs={12}>
                  <h1 style={titleStyle}>
                    <button
                      style={{ ...buttonStyle, textAlign: `left` }}
                      type="button"
                      onClick={handleOpen}
                    >
                      <span style={titleSpacing}>Cellular </span>
                      <span style={titleSpacing}>
                        Chorus <Share />
                      </span>
                    </button>
                  </h1>
                </Grid>
                <Grid item xs={12}>
                  <h2 style={authorStyle}>
                    <a
                      href="https://soundcloud.com/patriciawolf_music"
                      style={linkStyle}
                      target="_blank"
                    >
                      Patricia Wolf <OpenInNew />
                    </a>
                  </h2>

                  <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: duration,
                    }}
                  >
                    <Fade in={open} timeout={duration}>
                      <ShareModal in={open} />
                    </Fade>
                  </Modal>
                </Grid>
              </Grid>
              <p>
                <a href="https://cellularchorus.com" target="_blank">
                  <span style={linkStyle}>Cellular Chorus</span>
                </a>{" "}
                is a work of spatialized aleatoric music using smartphones to
                bring people physically closer to have an interactive and
                collective experience with light and sound.
              </p>
              <p>
                The piece is played by each user visiting 
                <a href="https://cellularchorus.com" target="_blank">
                  <span style={linkStyle}>Cellular Chorus</span>
                </a>
                 on their smartphones. In order for the piece to play, users
                must have “Silent Mode” turned off on their phones. Once on the
                site, a random sound clip will be ready to be played. Each sound
                comes with a unique color I have chosen to pair with the sound.
                In the dark, the room will glow with the colored lights on the
                screens. Press play to hear a sound. If you want to hear another
                sound, press the “Next” button. The user has control of the
                volume through their phone’s normal volume control buttons. As
                others play the sounds in the space, listen to how they work
                together. Mix your sounds in and out and think about how they
                sound with what is happening in the room. Move around the space
                and think about how to make this composition more interesting to
                you with the limitations of the piece. You can explore the
                sounds on the site or let a favorite one loop forever as the
                others around you change unpredictably. The sounds I made are
                meant to harmonize. There is no right or wrong way to play them.
                The intention of this piece is to repurpose your smartphone for
                deep listening, creative experimentation, and to immerse groups
                of people in a sound and light environment with face to face
                interactions.
              </p>
              <p>
                Concept + sound design by{" "}
                <a
                  href="https://soundcloud.com/patriciawolf_music"
                  target="_blank"
                >
                  <span style={linkStyle}>Patricia Wolf</span>
                </a>
                <br />
                <br />
                Web design + development by{" "}
                <a href="https://www.twitter.com/jaronheard" target="_blank">
                  <span style={linkStyle}>Jaron Heard</span>
                </a>
              </p>
              <br /> <br />
            </div>
          </div>
        </div>
      )}
    </Transition>
  )
}

export default Info
