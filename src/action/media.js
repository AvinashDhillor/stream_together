import { VIDEO_STATE, VIDEO_UPLOAD_FINISH } from './types';

export const setVideoState = () => ({
  type: VIDEO_STATE
});

export const videoUploadFinish = () => ({
  type: VIDEO_UPLOAD_FINISH
});
