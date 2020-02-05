import React from "react"

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

const infoStyle = {
  fontFamily: `'Roboto Condensed', sans-serif`,
  position: `absolute`,
  top: `0`,
  left: `0`,
  width: `100%`,
  height: `calc(100% - 6em)`,
  zIndex: `10`,
  padding: `2em`,
  marginTop: `4em`,
  background: `transparent`,
}

const Info = ({ in: inProp }) => (
  <Transition in={inProp} timeout={duration}>
    {state => (
      <div
        style={{
          ...defaultStyle,
          ...transitionStyles[state],
        }}
      >
        <div style={infoStyle}>
          <div style={{ margin: `0 auto`, maxWidth: `800px` }}>
            <p>
            <strong>Cellular Chorus by</strong> <a href="https://soundcloud.com/patriciawolf_music">Patricia Wolf</a>
            </p>
            <p>
            Cellular Chorus is a work of spatialized aleatoric music using 
            smartphones to bring people physically closer to have an 
            interactive and collective experience with music.
            </p>
            <p>
            The piece is played by each user visiting cellularchorus.com on 
            their smartphones. In order for the piece to play, users must have 
            “Silent Mode” turned off on their phones. When accessing the site, 
            a random sound clip will be ready to be played. Each sound comes 
            with a unique color I have chosen to pair with the sound. In the 
            dark, the room will glow with the colored lights on the screen. 
            Press play to hear it. If you want to hear another sound, press 
            the “Next” button. The user has control of the volume through their 
            phone’s normal volume control buttons. As others play the sounds in 
            the space, listen to how they work together. Mix your sounds in and 
            out and think about how they sound with what is happening in the room. 
            Move around the space and think about how to make this composition more 
            interesting to you with the limitations of the piece. You can explore 
            the sounds on the site or let a favorite one loop forever as the others 
            around you change unpredictably. The sounds I made are meant to 
            harmonize. There is no right or wrong way to play it. The intention of 
            this piece is to use your smartphone for deep listening, creative 
            experimentation, and immersing in a sound and light environment within 
            a tangible space with real face to face interactions. 
            </p>
            <p>
              Concept and sound design by Patricia Wolf.
            </p>
          </div>
        </div>
      </div>
    )}
  </Transition>
)

export default Info
