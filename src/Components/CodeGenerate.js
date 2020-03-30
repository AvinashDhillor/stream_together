import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Grid } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function CodeGenerate(props) {
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center'
  });

  const { vertical, horizontal, open } = state;

  const handleClick = newState => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Grid item sm={4}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message='Copied To Clipboard'
      >
        <Alert onClose={handleClose} severity='success'>
          Copied To Clipboard
        </Alert>
      </Snackbar>
      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='codeGenerator'>Your Secret Code</InputLabel>
        <OutlinedInput
          id='codeGenerator'
          type='text'
          disabled={props.rid ? false : true}
          value={props.rid ? props.rid : 'Generating Ticket No...'}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                onClick={() => {
                  //   handleClick({ vertical: 'top', horizontal: 'left' });
                  props.copyToClipBoard();
                }}
                disabled={props.rid ? false : true}
                edge='end'
              >
                <FileCopyIcon></FileCopyIcon>
              </IconButton>
            </InputAdornment>
          }
          labelWidth={150}
        />

        <FormHelperText id='component-helper-text'>
          {props.rid
            ? 'Hurray 🎊, Send it and wait ⌛'
            : 'Copy above code and give it to your friend!'}
        </FormHelperText>
      </FormControl>
    </Grid>
  );
}

export default CodeGenerate;
