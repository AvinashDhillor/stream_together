import React, { Component } from 'react';
import Peer from 'simple-peer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactPlayer from 'react-player';

import {
  startSetInitiater,
  setConnect,
  subscribeConnection
} from '../action/connection';
import Upload from './Upload';

export class Host extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peer: new Peer({ initiator: true, trickle: false }),
      rid: null,
      percent: 0,
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
    this.state.peer.on('signal', data => {
      if (!this.props.ready) this.props.startSetInitiater(JSON.stringify(data));
    });

    this.state.peer.on('connect', () => {
      console.log('Connected');
      this.props.setConnect(true, this.props.rid);
    });

    this.state.peer.on('data', data => {});

    this.state.peer.on('stream', stream => {});
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

    this.state.peer.send('NewFile!');
    let count = 1;
    const chunkSize = 32 * 1024;
    let total = file.size / chunkSize;
    console.log(count.total);

    file.arrayBuffer().then(buffer => {
      while (buffer.byteLength) {
        const chunk = buffer.slice(0, chunkSize);
        buffer = buffer.slice(chunkSize, buffer.byteLength);
        this.state.peer.send(chunk);
        let pc = Math.floor((count * 100) / total);
        console.log(pc);
        count++;
      }

      this.state.peer.send('Done!');
    });
  };

  render() {
    return (
      <div>
        {this.state.rid}
        {this.props.connected && (
          <Upload fileSubmit={this.handleFileSubmit}></Upload>
        )}
        <br></br>
        {this.state.percent}
        <ReactPlayer url={this.state.dataURL} playing={true}></ReactPlayer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ready: state.connection.ready,
  rid: state.connection.rid,
  remote: state.connection.remote,
  connected: state.connection.connected
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      startSetInitiater,
      setConnect,
      subscribeConnection
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Host);
