import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { useNavigate, Link } from "react-router-dom";
// import image from './image.svg';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundImage: `linear-gradient(#cfd9df,#e2ebf0)`,
    color: 'grey',
  },
  bigAvatar: {
    margin: 30,
    width: 100,
    height: 100,
  },
}));

function SideMenu() {
    const classes = useStyles();
    const nav = useNavigate();
  
    return (
      <Drawer
        open={true}
        variant='permanent'
        anchor='left'
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Grid container justify='center' alignItems='center'>
          <Avatar
            src='https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg'
            // src = {image}
            className={classes.bigAvatar}
          />
        </Grid>
        <List>
          {['Profile', 'Sign Out'].map((text, index) => (
            <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <AccountCircle /> : <ExitToApp />}
            </ListItemIcon>
            {index === 1 ? (
              <Button color="primary" onClick={() => {nav("/")}}>
                <ListItemText primary={text} />
              </Button>
            ) : (
              <Button color="primary" onClick={() => console.log('Profile clicked')}>
                <ListItemText primary={text} />
              </Button>
            )}
          </ListItem>
          ))}
          <ListItem button>
        <ListItemIcon>
          <i className='fa fa-home'></i>
        </ListItemIcon>
        <Button color="primary" component={Link} to="/">
          <ListItemText primary="Dashboard" />
        </Button>
      </ListItem>
      <center><h5>Students Section</h5></center>
      <ListItem button>
        <ListItemIcon>
          <i className='fa fa-male' aria-hidden='true'></i>
        </ListItemIcon>
        <Button color="primary" component={Link} to="/student-register">
          <ListItemText primary="Student Registration" />
        </Button>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <i className='fa fa-rupee'></i>
        </ListItemIcon>
        <Button color="primary" component={Link} to="/student-fee">
          <ListItemText primary="Student Fees" />
        </Button>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <i className='fas fa-info'></i>
        </ListItemIcon>
        <Button color="primary" component={Link} to="/student_details">
          <ListItemText primary="Student Details" />
        </Button>
      </ListItem>
        </List>
      </Drawer>
    );
  }
  
  export default SideMenu;