import React from 'react';

import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import Grid from '@material-ui/core/Grid';
import ReactPlayer from 'react-player';
import PauseIcon from '@material-ui/icons/Pause';
import { connect } from 'react-redux';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%'
  },
  media: {
    height: '90%'
  },
  action: {
    height: '10%'
  },
  slider: {
    width: '100%'
  }
}));

function VideoPlayer(props) {
  const classes = useStyles();

  return (
    <Box width='95%' height='84%'>
      <Card className={classes.root}>
        <CardMedia className={classes.media}>
          <ReactPlayer
            playing={props.play}
            url={props.URL}
            ref={props.playerRef}
            width='100%'
            height='100%'
            onProgress={e => {
              props.handlePlayingState(e.played * 100);
            }}
            volume={props.playerVolume / 100}
            onEnded={props.toggleVideoState}
          ></ReactPlayer>
        </CardMedia>
        <CardActions className={classes.action}>
          <Grid container spacing={3} alignItems='center'>
            <Grid item sm={2}>
              <Box display='flex' justifyContent='center'>
                <IconButton
                  aria-label='delete'
                  className={classes.margin}
                  onClick={props.toggleVideoState}
                >
                  {props.play ? <PauseIcon></PauseIcon> : <PlayArrowIcon />}
                </IconButton>
              </Box>
            </Grid>
            <Grid item sm={8}>
              <Box display='flex' justifyContent='center'>
                <Slider
                  value={props.playingProgress}
                  onChange={props.handleVideoProgress}
                  aria-labelledby='disabled-slider'
                />
              </Box>
            </Grid>
            <Grid item sm={2}>
              <Box display='flex'>
                <div className={classes.slider}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <VolumeDown />
                    </Grid>
                    <Grid item xs>
                      <Slider
                        color={'default'}
                        value={props.playerVolume}
                        onChange={props.handlePlayerVolume}
                        aria-labelledby='continuous-slider'
                      />
                    </Grid>
                    <Grid item>
                      <VolumeUp />
                    </Grid>
                  </Grid>
                </div>
              </Box>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Box>
  );
}

const mapStateToProps = state => ({
  play: state.media.play,
  ready: state.media.ready
});

export default connect(mapStateToProps)(VideoPlayer);
