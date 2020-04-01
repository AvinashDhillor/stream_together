import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import workingVideo from '../util/working.mp4';
import poster from '../util/poster.png';

function Working() {
  return (
    <Container height='100%'>
      <Typography variant='h3'>How it works?</Typography>
      <Box width='100%' display='flex' justifyContent='center' marginTop={4}>
        <video
          src={workingVideo}
          controls
          poster={poster}
          width='inherit'
          height='inherit'
        ></video>
      </Box>
    </Container>
  );
}

export default Working;
