import { SET_INITIATER, SET_REMOTE_INIT, SET_CONNECTION } from './types';
import database from '../firebase/firebase';

export const setInitiater = data => {
  return {
    type: SET_INITIATER,
    payload: data
  };
};

export const startSetInitiater = hostPayload => {
  return dispatch => {
    database
      .ref('payload')
      .push({
        init: hostPayload,
        ready: false
      })
      .then(snap => {
        let key = snap.key;
        dispatch(
          setInitiater({
            init: hostPayload,
            rid: key,
            ready: false
          })
        );
        dispatch(subscribeConnection(key));
      });
  };
};

export const setRemoteInit = data => ({
  type: SET_REMOTE_INIT,
  payload: data
});

export const startSetRemoteInit = rid => {
  return dispatch => {
    database
      .ref(`payload/${rid}`)
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          let data = {
            init: snapshot.val().init,
            rid: rid,
            connected: false
          };
          dispatch(setRemoteInit(data));
          dispatch(subscribeConnection(rid));
        }
      });
  };
};

export const startSetRemote = ({ remotePayload, rid, initPayload }) => {
  return dispatch => {
    let data = {
      remote: remotePayload,
      ready: true,
      connected: false,
      init: initPayload
    };
    database.ref(`payload/${rid}`).set(data);
    dispatch(setRemoteInit(data));
  };
};

/** Common */

export const setConnection = status => ({
  type: SET_CONNECTION,
  payload: status
});

export const subscribeConnection = rid => {
  return dispatch => {
    database.ref(`payload/${rid}`).on('value', snapshot => {
      let { connected, ready, remote } = snapshot.val();
      let data = {
        connected,
        ready,
        remote
      };
      dispatch(setConnection(data));
    });
  };
};

export const setConnect = (status, rid) => {
  return dispatch => {
    database.ref(`payload/${rid}/connected`).set(status);
    dispatch(setConnection({ connected: status }));
  };
};
