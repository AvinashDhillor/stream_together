import { VIDEO_STATE, VIDEO_UPLOAD_FINISH } from '../action/types';

const initState = {
  play: false,
  ready: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case VIDEO_STATE:
      let stat = !state.play;
      return {
        ...state,
        play: stat
      };
    case VIDEO_UPLOAD_FINISH:
      return {
        ...state,
        ready: true
      };
    default:
      return state;
  }
};
