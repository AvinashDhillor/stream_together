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

export class Host extends Component {
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
        this.setState({
          peer: new Peer({
            initiator: true,
            trickle: false,
            stream: stream
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

  render() {
    return (
      <div>
        {this.state.rid}
        {this.props.connected && (
          <Upload fileSubmit={this.handleFileSubmit}></Upload>
        )}
        <br></br>

        <VideoPlayer
          URL={this.state.dataURL}
          toggleVideoState={this.handleToggleVideoState}
        ></VideoPlayer>

        <div>
          <video
            ref={this.hostRef}
            width='200px'
            height='200px'
            src=''
            autoPlay
          ></video>{' '}
          <video
            ref={this.peerRef}
            width='200px'
            height='200px'
            src=''
            autoPlay
          ></video>{' '}
        </div>
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
