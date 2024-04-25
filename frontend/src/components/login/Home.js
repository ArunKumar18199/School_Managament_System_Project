import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SideMenu from './SideMenu';
import Footer from './footer';
import MainContent from './MainContent';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <TopMenu /> */}
      <SideMenu />
      <MainContent/>
      <Footer />
    </div>
  );
}

export default Home;