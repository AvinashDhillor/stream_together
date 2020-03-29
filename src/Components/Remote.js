import React, { Component } from 'react';
import Peer from 'simple-peer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactPlayer from 'react-player';

import {
  startSetRemoteInit,
  startSetRemote,
  setConnect
} from '../action/connection';

export class Remote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peer: new Peer({ trickle: false }),
      file: [],
      dataURL: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rid !== '' && nextProps.init !== '') {
      this.state.peer.signal(JSON.parse(nextProps.init));
    }
  }

  handleChange = e => {
    e.preventDefault();
    let rid = e.target.value;
    this.props.startSetRemoteInit(rid);
  };

  componentDidMount() {
    this.state.peer.on('signal', data => {
      let payloadData = {
        remotePayload: JSON.stringify(data),
        rid: this.props.rid,
        initPayload: this.props.init
      };
      this.props.startSetRemote(payloadData);
    });

    this.state.peer.on('connect', () => {
      console.log('Connected');
    });

    let file = [];

    this.state.peer.on('data', data => {
      if (data.toString() === 'NewFile!') {
        file = [];
      } else if (data.toString() === 'Done!') {
        const newFile = new Blob(file);
        let dataURL = URL.createObjectURL(newFile);
        this.setState({
          dataURL
        });
      } else {
        file.push(data);
      }
    });

    this.state.peer.on('stream', stream => {});
  }

  componentWillUnmount() {
    console.log('dissconnected');
    this.props.setConnect(false, this.props.rid);
    this.state.peer.destroy();
  }

  render() {
    return (
      <div>
        <input type='text' onChange={this.handleChange}></input>
        <ReactPlayer url={this.state.dataURL} playing={true}></ReactPlayer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rid: state.connection.rid,
  init: state.connection.init
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { startSetRemoteInit, startSetRemote, setConnect },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Remote);
