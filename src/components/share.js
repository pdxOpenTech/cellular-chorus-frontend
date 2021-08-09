import React from "react"
import qr from "../images/qr-code.png"
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TumblrShareButton,
  TumblrIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share"
import { Link, Check } from "@material-ui/icons"
import { Grid } from "@material-ui/core"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Transition, Fade } from "react-transition-group"

const duration = 1000

const defaultStyle = {
  transition: `background-color opacity ${duration}ms ease-in-out`,
  opacity: 0,

}

const transitionStyles = {
  entering: { opacity: 0, backgroundColor: `transparent` },
  entered: { opacity: 1, backgroundColor: `white` },
  exiting: { opacity: 0, backgroundColor: `transparent` },
  exited: { opacity: 0, backgroundColor: `transparent` },
}

const modalStyle = {
  width: `max-content`,
  height: `80vh`,
  margin: `10vh auto 0 auto`,
  overflowX: `auto`
}

const linkStyle = {
  color: `black`,
  textDecoration: `none`,
  fontWeight: `200`,
  letterSpacing: `0.12em`,
  fontStyle: `italic`
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

const Share = ({ in: inProp }) => {
  const [copied, setCopied] = React.useState(false)

  return (
    <Transition in={inProp} timeout={duration}>
      {state => (
        <div
          style={{ ...modalStyle, ...defaultStyle, ...transitionStyles[state] }}
        >
          <br />
          <Grid container direction="row" alignItems="center" justify="center">
            <img src={qr} style={{ maxHeight: `60vh`, maxWidth: `80vw` }} />
          </Grid>
          <Grid container direction="row" alignItems="center" justify="center">
            <Grid item>
              <TwitterShareButton
                url="https://noisetech.netlify.app"
                title={`NoiseTech Cellular Chorus by @pdxOpenTech\n`}
                hashtags={["noisetechcellularchorus"]}
              >
                <TwitterIcon
                  iconFillColor="black"
                  bgStyle={{ fill: `transparent` }}
                />
              </TwitterShareButton>
            </Grid>
            <Grid item>
              <FacebookShareButton
                url="https://noisetech.netlify.app"
                title=" NoiseTech Cellular Chorus"
                hashtag="#noisetechcellularchorus"
              >
                <FacebookIcon
                  iconFillColor="black"
                  bgStyle={{ fill: `transparent` }}
                />
              </FacebookShareButton>
            </Grid>
            <Grid item>
              <TumblrShareButton
                url="https://noisetech.netlify.app"
                title="NoiseTech Cellular Chorus"
                tags={["noisetechcellularchorus"]}
              >
                <TumblrIcon
                  iconFillColor="black"
                  bgStyle={{ fill: `transparent` }}
                />
              </TumblrShareButton>
            </Grid>
            <Grid item>
              <EmailShareButton
                url="https://noisetech.netlify.app"
                subject=" NoiseTech Cellular Chorus"
                body=" NoiseTech Cellular Chorus by pdxOpenTech"
                separator={`\n`}
              >
                <EmailIcon
                  iconFillColor="black"
                  bgStyle={{ fill: `transparent` }}
                />
              </EmailShareButton>
            </Grid>
            <Grid item>
              <CopyToClipboard
                text="https://noisetech.netlify.app"
                title="Copy link"
                onCopy={() => setCopied(true)}
              >
                <button style={buttonStyle}>
                  {copied ? (
                    <Check fontSize="large" />
                  ) : (
                    <Link fontSize="large" />
                  )}
                </button>
              </CopyToClipboard>
            </Grid>
          </Grid>
          <br />
          <Grid container direction="row" alignItems="center" justify="center">
            <h2 id="simple-modal-title">
              <span style={linkStyle}>#noisetechcellularchorus</span>
            </h2>
          </Grid>
        </div>
      )}
    </Transition>
  )
}

export default Share
