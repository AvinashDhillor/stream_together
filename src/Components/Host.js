import React, { Component } from 'react';
import Peer from 'simple-peer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  startSetInitiater,
  setConnect,
  subscribeConnection
} from '../action/connection';
import { setVideoState, videoUploadFinish } from '../action/media';

import Upload from './Upload';
import VideoPlayer from './VideoPlayer';
import VideoCall from './VideoCall';
import { Box, Grid } from '@material-ui/core';
import CodeGenerate from './CodeGenerate';
import copy from 'clipboard-copy';

export class Host extends Component {
  constructor(props) {
    super(props);
    this.cbHostRef = null;
    this.stream = null;
    this.hostRef = element => {
      this.cbHostRef = element;
    };
    this.cbPeerRef = null;
    this.peerRef = element => {
      this.cbPeerRef = element;
    };
    this.state = {
      peer: null,
      rid: null,
      dataURL: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.ready && nextProps.rid.length !== 0) {
      this.setState({ rid: nextProps.rid });
    }
    if (nextProps.ready && !nextProps.connected) {
      this.state.peer.signal(JSON.parse(nextProps.remote));
    }
  }

  componentDidMount() {
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.stream = stream;
        this.setState({
          peer: new Peer({
            initiator: true,
            trickle: false,
            stream: this.stream
          })
        });

        this.state.peer.on('signal', data => {
          if (!this.props.ready)
            this.props.startSetInitiater(JSON.stringify(data));
        });

        this.state.peer.on('connect', () => {
          console.log('Connected');
          this.props.setConnect(true, this.props.rid);
        });

        this.state.peer.on('data', data => {
          if (data.toString() === 'VIDEO_UPLOAD_FINISH') {
            this.props.videoUploadFinish();
          } else if (data.toString() === 'PLAY') {
            if (!this.props.play) this.props.setVideoState();
          } else if (data.toString() === 'PAUSE') {
            if (this.props.play) this.props.setVideoState();
          }
        });

        this.state.peer.on('stream', stream => {
          console.log('Stream');
          if (this.cbPeerRef) {
            this.cbPeerRef.srcObject = stream;
          }
        });

        if (this.cbHostRef) {
          this.cbHostRef.srcObject = this.stream;
        }
      });
    }
  }

  componentWillUnmount() {
    console.log('dissconnected');
    this.props.setConnect(false, this.props.rid);
    this.state.peer.destroy();
    this.stream.getTracks().forEach(track => track.stop());
  }

  handleFileSubmit = e => {
    e.preventDefault();
    let file = e.target.files[0];

    let url = URL.createObjectURL(file);
    this.setState({
      dataURL: url
    });

    this.state.peer.send('NEW_FILE');
    let count = 1;
    const chunkSize = 32 * 1024;
    let totalChunks = file.size / chunkSize;

    file.arrayBuffer().then(buffer => {
      while (buffer.byteLength) {
        const chunk = buffer.slice(0, chunkSize);
        buffer = buffer.slice(chunkSize, buffer.byteLength);
        this.state.peer.send(chunk);
        let pc = Math.floor((count * 100) / totalChunks);
        document.title = `${pc}% uploaded`;
        count++;
        this.state.peer.send(`${pc}% Received`);
      }
      document.title = 'Enjoy 🥤🍿🎉';
      this.state.peer.send('DONE');
    });
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

  copyToClipBoard = () => {
    console.log('copying');
    copy(this.state.rid);
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
                border={2}
              >
                {!this.props.ready && !this.props.connected && (
                  <CodeGenerate
                    rid={this.state.rid}
                    copyToClipBoard={this.copyToClipBoard}
                  >
                    {' '}
                  </CodeGenerate>
                )}
                {this.props.connected && (
                  <div>
                    <VideoPlayer
                      URL={this.state.dataURL}
                      toggleVideoState={this.handleToggleVideoState}
                    ></VideoPlayer>
                    <Upload fileSubmit={this.handleFileSubmit}></Upload>
                  </div>
                )}
                <br></br>
              </Box>
            </Grid>

            <Grid item sm={3}>
              <Box display='flex' justifyContent='center' height='100%'>
                <VideoCall
                  hostRef={this.hostRef}
                  peerRef={this.peerRef}
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
  ready: state.connection.ready,
  rid: state.connection.rid,
  remote: state.connection.remote,
  connected: state.connection.connected,
  play: state.media.play
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      startSetInitiater,
      setConnect,
      subscribeConnection,
      setVideoState,
      videoUploadFinish
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Host);
