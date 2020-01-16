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
              Burmese abyssinian . Malkin balinese , yet thai, and russian blue.
              American bobtail balinese . Himalayan. Turkish angora. Himalayan
              american bobtail. Scottish fold balinese scottish fold maine coon
              for american bobtail but mouser.
            </p>
            <p>
              Panther ragdoll puma or panther. Siberian tom but egyptian mau.
              Singapura jaguar so jaguar yet american shorthair ocelot so
              cornish rex. Siamese american shorthair and scottish fold ocelot.
            </p>
          </div>
        </div>
      </div>
    )}
  </Transition>
)

export default Info
