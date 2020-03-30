import React from 'react';
import { NavLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import CameraIcon from '@material-ui/icons/Camera';
import DialpadIcon from '@material-ui/icons/Dialpad';
import { Box, Grid } from '@material-ui/core';

function Main() {
  return (
    <div>
      <Box
        textAlign='center'
        marginTop={15}
        padding={3}
        display='flex'
        alignItems='center'
        flexDirection='column'
      >
        {' '}
        <Typography variant='h2'>Stream Togther With Friend</Typography>
        <Box marginTop={3} width={3 / 5} fontWeight='fontWeightBold'>
          <Typography variant='span'>
            Do you Keep movies in your local machine? Dont worry, You can still
            watch with your friend (peer to peer). <br></br>ALL FREE! Without
            any Login/Signup
          </Typography>
        </Box>
      </Box>
      <Box display={'flex'} justifyContent='center' marginTop={2}>
        <Grid container item lg={7} display='flex' justify='center' spacing={3}>
          <Grid item lg={4}>
            <Box display='flex' justifyContent={'flex-end'}>
              <Button
                variant='contained'
                color='secondary'
                size='large'
                startIcon={<CameraIcon />}
              >
                <Link
                  color='textPrimary'
                  underline='none'
                  component={({ className, children }) => (
                    <NavLink className={className} to='/host'>
                      Become the host
                    </NavLink>
                  )}
                ></Link>
              </Button>
            </Box>
          </Grid>

          <Divider orientation='vertical' flexItem />

          <Grid item lg={4}>
            <Box display='flex' justifyContent={'flex-start'}>
              <Button
                variant='contained'
                color='primary'
                size='large'
                startIcon={<DialpadIcon />}
              >
                <Link
                  color='textPrimary'
                  underline='none'
                  component={({ className, children }) => (
                    <NavLink className={className} to='/remote'>
                      Join the host
                    </NavLink>
                  )}
                ></Link>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Main;
