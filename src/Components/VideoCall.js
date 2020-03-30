import React from 'react';
import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import BlackBackground from '../util/black-background.jpg';
import IconButton from '@material-ui/core/IconButton';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import VideocamIcon from '@material-ui/icons/Videocam';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    Width: 300,
    Height: 290,
    maxWidth: 300,
    maxHeight: 290
  },
  media: {
    display: 'flex',
    justifyContent: 'center'
  },
  slider: {
    width: 200
  }
}));

function VideoCall(props) {
  const classes = useStyles();

  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
          <video
            ref={props.peerRef}
            width='100%'
            height='100%'
            poster={BlackBackground}
            src=''
            autoPlay
          ></video>{' '}
        </CardMedia>
        <CardActions className={classes.media}>
          <div className={classes.slider}>
            <Grid container spacing={2}>
              <Grid item>
                <VolumeDown />
              </Grid>
              <Grid item xs>
                <Slider
                  color={'default'}
                  value={value}
                  onChange={handleChange}
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
        <CardMedia className={classes.media}>
          <video
            ref={props.hostRef}
            width='100%'
            height='100%'
            src=''
            autoPlay
          ></video>{' '}
        </CardMedia>
        <CardActions className={classes.media}>
          <IconButton aria-label='delete'>
            <VideocamIcon />
          </IconButton>
          <IconButton aria-label='delete'>
            <KeyboardVoiceIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
}

export default VideoCall;
