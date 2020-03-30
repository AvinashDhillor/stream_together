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
    this.state = {
      peer: null,
      file: [],
      dataURL: null
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
  }

  handleChange = e => {
    e.preventDefault();
    let rid = e.target.value;
    this.props.startSetRemoteInit(rid);
  };

  componentDidMount() {
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.setState({
          peer: new Peer({ trickle: false, stream: stream })
        });

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

        if (this.cbHostRef) {
          this.cbHostRef.srcObject = stream;
        }
      });
    }
  }

  componentWillUnmount() {
    console.log('dissconnected');
    this.props.setConnect(false, this.props.rid);
    this.state.peer.destroy();
  }

  handleToggleVideoState = () => {
    let currentState = this.props.play;

    if (currentState) {
      this.state.peer.send('PAUSE');
    } else {
      this.state.peer.send('PLAY');
    }
    this.props.setVideoState();
  };

  render() {
    return (
      <div>
        <input type='text' onChange={this.handleChange}></input>
        <VideoPlayer
          URL={this.state.dataURL}
          toggleVideoState={this.handleToggleVideoState}
        ></VideoPlayer>

        <VideoCall hostRef={this.hostRef} peerRef={this.peerRef}></VideoCall>
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
