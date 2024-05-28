import React, { useState, useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Dialog, DialogContent} from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { useNavigate, Link } from "react-router-dom";
import MainContent from './MainContent';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    cursor: 'pointer',
  },
  mainContent: {
    padding: theme.spacing(3),
    width: `calc(100% - ${drawerWidth}px)`,
  },
  hiddenInput: {
    display: 'none',
  },
  removeButton: {
    marginTop: 10,
  },
}));

function SideMenu() {
  const classes = useStyles();
  const nav = useNavigate();
  const defaultAvatar = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fin.pinterest.com%2Fpin%2Fdefault-avatar-profile-icon-of-social-media-user--947022627871095943%2F&psig=AOvVaw3SS_ocfPZdID1mflQiRTGu&ust=1716644517999000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLjvxq-1poYDFQAAAAAdAAAAABAE';
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const storedAvatar = localStorage.getItem('avatar');
    if (storedAvatar) {
      setAvatar(storedAvatar);
    }
  }, []);

  const handleAvatarClick = () => {
    document.getElementById('avatarInput').click();
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newAvatar = reader.result;
        setAvatar(newAvatar);
        localStorage.setItem('avatar', newAvatar);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleRemoveAvatar = () => {
    setAvatar(defaultAvatar);
    localStorage.removeItem('avatar');
  };

  return (
    <Grid container style={{ height: 'calc(100vh - 100px)' }}>
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
            src={avatar}
            className={classes.bigAvatar}
            onClick={handleAvatarClick}
          />
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            className={classes.hiddenInput}
            onChange={handleAvatarChange}
          />
          <Button
            variant="contained"
            color="secondary"
            className={classes.removeButton}
            onClick={handleRemoveAvatar}
          >
            Remove Profile Pic
          </Button>
        </Grid>
        <List>
          <ListItem button onClick={handleOpenDialog}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="View Profile Pic" />
          </ListItem>
          {['Sign Out'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <Button color="primary" onClick={() => { toast.success("Logged Out successfully!"); nav("/"); }}>
                <ListItemText primary={text} />
              </Button>
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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <img src={avatar} alt="Avatar" style={{ width: '100%' }} />
        </DialogContent>
      </Dialog>
      <main className={classes.mainContent}>
        <MainContent sidebarWidth={drawerWidth} />
      </main>
    </Grid>
  );
}

export default SideMenu;
