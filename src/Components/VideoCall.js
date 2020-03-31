import React from 'react';
import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';

import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import BlackBackground from '../util/black-background.jpg';
import IconButton from '@material-ui/core/IconButton';

import VideocamIcon from '@material-ui/icons/Videocam';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import Grid from '@material-ui/core/Grid';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicOffIcon from '@material-ui/icons/MicOff';
import MicIcon from '@material-ui/icons/Mic';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 300,
    position: 'relative',
    maxHeight: 290
  },
  media: {
    display: 'flex',
    justifyContent: 'center'
  },
  slider: {
    width: 200
  },
  action: {
    display: 'flex',
    justifyContent: 'center'
  },
  status: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 0,
    padding: '5px',
    color: '#e0e0e0'
  }
}));

function VideoCall(props) {
  const classes = useStyles();

  return (
    <Box
      height='100vh'
      display='flex'
      flexDirection='column'
      justifyContent='space-evenly'
      alignItems='center'
    >
      <Card className={classes.root}>
        <CardMedia className={classes.media}>
          <p className={classes.status}>{props.connected ? 'On' : 'Off'}</p>
          <video
            ref={props.peerRef}
            width='100%'
            height='100%'
            poster={BlackBackground}
            src=''
            autoPlay
          ></video>{' '}
        </CardMedia>
        <CardActions className={classes.action}>
          <div className={classes.slider}>
            <Grid container spacing={2}>
              <Grid item>
                <VolumeDown />
              </Grid>
              <Grid item xs>
                <Slider
                  color={'default'}
                  value={props.peerVolume}
                  onChange={props.handlePeerVolume}
                  aria-labelledby='continuous-slider'
                />
              </Grid>
              <Grid item>
                <VolumeUp />
              </Grid>
            </Grid>
          </div>
        </CardActions>
      </Card>
      <Card className={classes.root}>
        <CardMedia className={classes.action}>
          <video
            ref={props.hostRef}
            width='100%'
            height='100%'
            src=''
            muted
            autoPlay
          ></video>{' '}
        </CardMedia>
        <CardActions className={classes.media}>
          <IconButton onClick={props.handleCamStream}>
            {props.camState ? (
              <VideocamIcon></VideocamIcon>
            ) : (
              <VideocamOffIcon></VideocamOffIcon>
            )}
          </IconButton>
          <IconButton onClick={props.handleMicStream}>
            {props.micState ? <MicIcon></MicIcon> : <MicOffIcon></MicOffIcon>}
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
}

export default VideoCall;
