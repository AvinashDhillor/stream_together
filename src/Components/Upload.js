import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: 'none'
  }
}));

export default function Upload(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept='video/*'
        className={classes.input}
        id='contained-button-file'
        multiple={false}
        type='file'
        onChange={props.fileSubmit}
      />
      <label htmlFor='contained-button-file'>
        <Button
          variant='contained'
          color='primary'
          component='span'
          startIcon={<VideoLibraryIcon></VideoLibraryIcon>}
        >
          Select a Video File
        </Button>
      </label>
    </div>
  );
}
