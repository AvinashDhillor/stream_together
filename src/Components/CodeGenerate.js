import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Grid } from '@material-ui/core';

function CodeGenerate(props) {
  return (
    <Grid item sm={4}>
      <FormControl fullWidth variant='outlined'>
        <InputLabel htmlFor='codeGenerator'>Your Secret Code</InputLabel>
        <OutlinedInput
          id='codeGenerator'
          type='text'
          disabled={props.rid ? false : true}
          value={props.rid ? props.rid : 'Generating...'}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                onClick={() => {
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
            ? 'Hurray 🎊, Send it to other person and wait ⌛'
            : 'Copy above code and give it to your friend!'}
        </FormHelperText>
      </FormControl>
    </Grid>
  );
}

export default CodeGenerate;
