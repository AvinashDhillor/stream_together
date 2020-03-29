import React, { Component } from 'react';
import Peer from 'simple-peer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
      peer: new Peer({ trickle: false }),
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
    this.state.peer.on('signal', data => {
      console.log(data);

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
      if (data.toString() === 'NEW_FILE') {
        file = [];
      } else if (data.toString() === 'DONE') {
        const newFile = new Blob(file);
        let dataURL = URL.createObjectURL(newFile);
        this.setState({
          dataURL
        });
        this.props.videoUploadFinish();
      } else if (data.toString() === 'PLAY') {
        console.log('PLAY it!');
        if (!this.props.play) this.props.setVideoState();
      } else if (data.toString() === 'PAUSE') {
        console.log('PAUSE it!');
        if (this.props.play) this.props.setVideoState();
      } else {
        console.log('data coming');

        file.push(data);
      }
    });

    this.state.peer.on('stream', stream => {
      console.log('stream');
      if (this.cbPeerRef) {
        this.cbPeerRef.srcObject = stream;
      }
    });
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

  handleStartStreaming = () => {
    if (this.cbHostRef) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(stream => {
          this.cbHostRef.srcObject = stream;
          this.state.peer.addStream(stream);
        });
    }
  };

  render() {
    return (
      <div>
        <input type='text' onChange={this.handleChange}></input>
        <VideoPlayer
          URL={this.state.dataURL}
          toggleVideoState={this.handleToggleVideoState}
        ></VideoPlayer>

        <div>
          <button onClick={this.handleStartStreaming}>Start Streaming</button>
          <video
            ref={this.hostRef}
            width='200px'
            height='200px'
            src=''
            autoPlay
          ></video>{' '}
          <video ref={this.peerRef} autoPlay></video>{' '}
        </div>
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
