import React from 'react';

import { Box, Grid, Typography, Link } from '@material-ui/core';

function ErrorPage() {
  return (
    <Box display='flex' justifyContent='center' marginTop={15}>
      <Grid item lg={6}>
        <Typography variant='h3'>
          {' '}
          Connection Error, Please generate new code and invite again.
          <Link href='/'>Click here</Link>
        </Typography>
      </Grid>
    </Box>
  );
}

export default ErrorPage;
