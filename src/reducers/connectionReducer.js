import {
  SET_INITIATER,
  SET_REMOTE_INIT,
  SET_CONNECTION
} from '../action/types';

const initState = {
  init: '',
  remote: '',
  ready: true,
  rid: '',
  connected: true
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_INITIATER:
      return {
        ...state,
        ...action.payload
      };
    case SET_REMOTE_INIT:
      return {
        ...state,
        ...action.payload
      };
    case SET_CONNECTION:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};
