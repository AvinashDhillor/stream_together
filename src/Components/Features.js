import React from 'react';
import { Box, Container, Typography, Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SyncIcon from '@material-ui/icons/Sync';
import VideocamIcon from '@material-ui/icons/Videocam';

const useStyles = makeStyles({
  root: {
    maxWidth: 300
  },
  media: {
    height: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

function Features() {
  const classes = useStyles();
  return (
    <Container height='100%'>
      <Typography variant='h3'>Features</Typography>
      <Box
        width='100%'
        display='flex'
        justifyContent='center'
        marginX='auto'
        marginTop={10}
      >
        <Grid container>
          <Grid container justify='center' sm={4}>
            <Card className={classes.root} border={5}>
              <CardActionArea>
                <CardMedia className={classes.media}>
                  <SyncIcon style={{ fontSize: 100 }}></SyncIcon>
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant='h5' component='h2'>
                    Auto Sync
                  </Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                  >
                    Video play in Sync on both sides. So you can always go back
                    or forward along with you friend
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid container justify='center' sm={4}>
            <Card className={classes.root} border={5}>
              <CardActionArea>
                <CardMedia className={classes.media}>
                  <PeopleAltIcon style={{ fontSize: 100 }}></PeopleAltIcon>
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant='h5' component='h2'>
                    Watch Together
                  </Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                  >
                    Watch any local video in your machine with your friend. No
                    login and signup is required
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid container justify='center' sm={4}>
            <Card className={classes.root} border={5}>
              <CardActionArea>
                <CardMedia className={classes.media}>
                  <VideocamIcon style={{ fontSize: 100 }}></VideocamIcon>
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant='h5' component='h2'>
                    Video & Voice
                  </Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                  >
                    Enjoy watching your partner reaction through video & voice
                    feature in application.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Features;
