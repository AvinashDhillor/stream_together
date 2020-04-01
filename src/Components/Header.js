import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Box, Link, Grid } from '@material-ui/core';
import LOGO from '../util/logo/logo-6.png';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function Header() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position='static' color='inherit'>
        <Toolbar>
          <Box margin={1}>
            <img src={LOGO} alt='logo'></img>
          </Box>
          <Typography variant='h5' className={classes.title}>
            NETKAST
          </Typography>
          <Box marginLeft='auto'>
            <Grid container spacing={4}>
              <Grid item>
                <Link variant='h6' color='inherit' underline='none' href='#'>
                  Home
                </Link>
              </Grid>
              <Grid item>
                <Link
                  variant='h6'
                  color='inherit'
                  underline='none'
                  href='#features'
                >
                  Features
                </Link>
              </Grid>
              <Grid item>
                <Link
                  variant='h6'
                  color='inherit'
                  underline='none'
                  href='#working'
                >
                  How it works?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  variant='h6'
                  color='inherit'
                  underline='none'
                  href='#about'
                >
                  About
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
