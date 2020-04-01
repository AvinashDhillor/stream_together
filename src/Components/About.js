import React from 'react';

import { Box, Container, Typography } from '@material-ui/core';

function About() {
  return (
    <Container height='100%'>
      <Typography variant='h3'>About</Typography>
      <Box
        width='100%'
        display='flex'
        paddingX='15%'
        justifyContent='center'
        marginTop={4}
      >
        <Typography variant='body1'>
          This project is build for those people who like watching movies/videos
          with friends. It work in synchronize, means movie or video will be
          played togther. If one stop/forward/reverse video then it will do same
          in other person's machine automatic. This project is still under
          development so it may crash sometime
        </Typography>
      </Box>
    </Container>
  );
}

export default About;
