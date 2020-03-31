import React, { Component } from 'react';
import Peer from 'simple-peer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VideoCall from './VideoCall';

import {
  startSetRemoteInit,
  startSetRemote,
  setConnect
} from '../action/connection';
import VideoPlayer from './VideoPlayer';
import { setVideoState, videoUploadFinish } from '../action/media';
import { Box, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

export class Remote extends Component {
  constructor(props) {
    super(props);
    this.cbHostRef = null;
    this.hostRef = element => {
      this.cbHostRef = element;
    };
    this.cbPeerRef = null;
    this.peerRef = element => {
      this.cbPeerRef = element;
    };
    this.cbPlayerRef = null;
    this.playerRef = element => {
      this.cbPlayerRef = element;
    };
    this.stream = null;
    this.state = {
      peer: null,
      file: [],
      dataURL: null,
      playerVolume: 100,
      camState: true,
      micState: true,
      playingProgress: 0,
      peerVolume: 30
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.connected && nextProps.rid !== '' && nextProps.init !== '') {
      this.state.peer.signal(JSON.parse(nextProps.init));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dataURL !== this.state.dataURL) {
      this.state.peer.send('VIDEO_UPLOAD_FINISH');
    }
    if (prevState.peer === null && this.state.peer !== null) {
      this.state.peer.on('signal', data => {
        if (data.type === 'answer') {
          let payloadData = {
            remotePayload: JSON.stringify(data),
            rid: this.props.rid,
            initPayload: this.props.init
          };
          this.props.startSetRemote(payloadData);
        }
      });

      this.state.peer.on('connect', () => {
        console.log('Connected');
      });

      let file = [];

      this.state.peer.on('data', data => {
        let content = data.toString();
        if (content === 'NEW_FILE') {
          file = [];
        } else if (content === 'DONE') {
          document.title = 'Enjoy 🥤🍿🎉';
          const newFile = new Blob(file);
          let dataURL = URL.createObjectURL(newFile);
          this.setState({
            dataURL
          });
          this.props.videoUploadFinish();
        } else if (content === 'PLAY') {
          if (!this.props.play) this.props.setVideoState();
        } else if (content === 'PAUSE') {
          if (this.props.play) this.props.setVideoState();
        } else if (content.includes('Received')) {
          document.title = content;
        } else if (content.includes('playingProgress')) {
          let progressVal = JSON.parse(content);
          this.handleVideoProgress(null, progressVal.playingProgress, false);
        } else {
          file.push(data);
        }
      });

      this.state.peer.on('stream', stream => {
        console.log('Stream');
        if (this.cbPeerRef) {
          this.cbPeerRef.srcObject = stream;
        }
      });

      this.state.peer.on('error', error => {
        console.log(error);
        this.props.setConnect(false, this.props.rid);
        this.props.history.push('/error');
      });
    }
  }

  handleChange = e => {
    e.preventDefault();
    let rid = e.target.value;
    this.props.startSetRemoteInit(rid);
  };

  componentDidMount() {
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(
        stream => {
          this.stream = stream;

          this.setState({
            peer: new Peer({ trickle: false, stream: this.stream })
          });

          if (this.cbHostRef) {
            this.cbHostRef.srcObject = this.stream;
          }
        },
        err => {
          this.setState({
            peer: new Peer({ trickle: false })
          });
        }
      );
    }
  }

  componentWillUnmount() {
    console.log('dissconnected');
    this.props.setConnect(false, this.props.rid);
    this.state.peer.destroy();
    this.stream.getTracks().forEach(track => track.stop());
  }

  handlePeerVolume = (event, newValue) => {
    this.setState({
      peerVolume: newValue
    });
    this.cbPeerRef.volume = newValue / 100;
  };

  handleToggleVideoState = () => {
    let currentState = this.props.play;

    if (currentState) {
      this.state.peer.send('PAUSE');
    } else {
      this.state.peer.send('PLAY');
    }
    this.props.setVideoState();
  };

  handlePlayerVolume = (e, newValue) => {
    this.setState({
      playerVolume: newValue
    });
    console.log(this.state.playerVolume);
  };

  handleVideoProgress = (e, newValue, updatePeer = true) => {
    if (updatePeer) {
      let pgD = {
        playingProgress: newValue
      };
      let stringData = JSON.stringify(pgD);
      this.state.peer.send(stringData);
    }

    if (this.cbPlayerRef) {
      this.cbPlayerRef.seekTo(newValue / 100, 'fraction');
    }
    this.handlePlayingState(newValue / 100);
  };

  handleCamStream = () => {
    if (this.state.camState) {
      this.setState({
        camState: false
      });
      this.stream.getVideoTracks()[0].enabled = false;
    } else {
      this.setState({
        camState: true
      });
      this.stream.getVideoTracks()[0].enabled = true;
    }
  };

  handleMicStream = () => {
    if (this.state.micState) {
      this.setState({
        micState: false
      });
      this.stream.getAudioTracks()[0].enabled = false;
    } else {
      this.setState({
        micState: true
      });
      this.stream.getAudioTracks()[0].enabled = true;
    }
  };

  handlePlayingState = value => {
    this.setState({
      playingProgress: value
    });
  };

  render() {
    return (
      <div>
        <Box
          css={{ height: '100vh' }}
          borderColor='primary'
          display='flex'
          alignItems='center'
        >
          <Grid container>
            <Grid item sm={9}>
              <Box
                height='100%'
                display='flex'
                justifyContent='center'
                alignItems='center'
              >
                {!this.props.ready && !this.props.connected && (
                  <Grid item sm={4}>
                    <TextField
                      fullWidth
                      id='outlined-search'
                      label='Paste Code Here & Wait ⌛'
                      onChange={this.handleChange}
                      type='search'
                      variant='outlined'
                    />
                  </Grid>
                )}
                {this.props.connected && (
                  <Box
                    width='100%'
                    height='100%'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    flexDirection='column'
                  >
                    <VideoPlayer
                      URL={this.state.dataURL}
                      toggleVideoState={this.handleToggleVideoState}
                      playerVolume={this.state.playerVolume}
                      handlePlayerVolume={this.handlePlayerVolume}
                      handleVideoProgress={this.handleVideoProgress}
                      playerRef={this.playerRef}
                      playingProgress={this.state.playingProgress}
                      handlePlayingState={this.handlePlayingState}
                    ></VideoPlayer>
                  </Box>
                )}
                <br></br>
              </Box>
            </Grid>

            <Grid item sm={3}>
              <Box display='flex' justifyContent='center' height='100%'>
                <VideoCall
                  hostRef={this.hostRef}
                  peerRef={this.peerRef}
                  camState={this.state.camState}
                  micState={this.state.micState}
                  handleCamStream={this.handleCamStream}
                  handleMicStream={this.handleMicStream}
                  connected={this.props.connected}
                  peerVolume={this.state.peerVolume}
                  handlePeerVolume={this.handlePeerVolume}
                ></VideoCall>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rid: state.connection.rid,
  init: state.connection.init,
  play: state.media.play,
  connected: state.connection.connected
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      startSetRemoteInit,
      startSetRemote,
      setConnect,
      setVideoState,
      videoUploadFinish
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Remote);
