import React from 'react';

import ReactPlayer from 'react-player';
import { connect } from 'react-redux';

function VideoPlayer(props) {
  return (
    <div>
      {
        <div>
          <ReactPlayer
            playing={props.play}
            url={props.URL}
            onEnded={props.toggleVideoState}
          ></ReactPlayer>
          <button onClick={props.toggleVideoState}>
            {props.play ? 'Pause' : 'Play'}
          </button>
        </div>
      }
    </div>
  );
}

const mapStateToProps = state => ({
  play: state.media.play,
  ready: state.media.ready
});

export default connect(mapStateToProps)(VideoPlayer);
