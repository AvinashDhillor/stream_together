import React from 'react';
import { NavLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import CameraIcon from '@material-ui/icons/Camera';
import DialpadIcon from '@material-ui/icons/Dialpad';
import { Box, Grid } from '@material-ui/core';
import Working from './Working';
import Header from './Header';
import About from './About';
import Features from './Features';

function Main() {
  return (
    <div>
      <Header></Header>
      <Box
        height='90vh'
        width='100%'
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
        id='home'
      >
        <Box width='70%' height='70%' paddingTop={2}>
          <Box
            textAlign='center'
            padding={3}
            display='flex'
            alignItems='center'
            flexDirection='column'
          >
            {' '}
            <Typography variant='h2'>Watch Together With Friend</Typography>
            <Box marginTop={3} width={5 / 6} fontWeight='light'>
              <Typography variant='span'>
                Enjoy video and voice call while watching movies with your
                friend. All you need is to collect your unique token and give it
                to your friend to join you on NETKAST. All <b>Free</b>, No{' '}
                <b>Login/Signup</b> required.
              </Typography>
            </Box>
          </Box>
          <Box display={'flex'} justifyContent='center' marginTop={2}>
            <Grid container item display='flex' justify='center' spacing={3}>
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
                          Become A host
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
        </Box>
      </Box>

      <Box
        width='100%'
        height='90vh'
        display='flex'
        textAlign='center'
        id='features'
      >
        <Features></Features>
      </Box>

      <Box
        width='100%'
        height='100vh'
        display='flex'
        alignItems='center'
        textAlign='center'
        id='working'
      >
        <Working></Working>
      </Box>
      <Box
        width='100%'
        height='100vh'
        display='flex'
        alignItems='center'
        textAlign='center'
        id='about'
      >
        <About></About>
      </Box>
    </div>
  );
}

export default Main;
