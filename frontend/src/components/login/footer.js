import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
// import Typography from '@material-ui/core/Typography';
import {
  MDBFooter,
  MDBContainer,
  MDBBtn
} from 'mdb-react-ui-kit';
import { MDBIcon} from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  title: {
    flexGrow: 1,
    marginLeft: 10,
  },
  footer: {
    marginLeft: 20,
    fontSize: 17,
  },
}));

 function App() {
    return (
      <MDBFooter className='bg-light text-center text-white'>
        <MDBContainer className='p-0 pb-0'>
          <section className='mb-4'>
            <MDBBtn
              floating
              className='m-1'
              style={{ backgroundColor: '#3b5998' }}
              href='#!'
              role='button'
            >
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>
  
            <MDBBtn
              floating
              className='m-1'
              style={{ backgroundColor: '#55acee' }}
              href='#!'
              role='button'
            >
              <MDBIcon fab icon='twitter' />
            </MDBBtn>
            <MDBBtn
              floating
              className='m-1'
              style={{ backgroundColor: '#ac2bac' }}
              href='https://www.instagram.com/arun_kumar_kollisetty/'
              role='button'
              target='_blank'
            >
              <MDBIcon fab icon='instagram' />
            </MDBBtn>
  
            <MDBBtn
              floating
              className='m-1'
              style={{ backgroundColor: '#0082ca' }}
              href='https://www.linkedin.com/in/kollisetty-arun-kumar-837899243/'
              role='button'
              target='_blank'
            >
              <MDBIcon fab icon='linkedin-in' />
            </MDBBtn>
  
            <MDBBtn
              floating
              className='m-1'
              style={{ backgroundColor: '#333333' }}
              href='#!'
              role='button'
            >
              <MDBIcon fab icon='github' />
            </MDBBtn>
          </section>
        </MDBContainer>
  
        <div className='text-center p-0' style={{ backgroundColor: '#2D68C4' }}>
        <h3>© Arun Kumar</h3> <a href>arunk18199@gmail.com</a> 
        </div>
      </MDBFooter>
    );
  }

  function Footer() {
    const classes = useStyles();
    return (
      <AppBar position='fixed' className={classes.appBar}>
        {/* <Typography variant='h6' className={classes.footer}> */}
          {App()}
        {/* </Typography> */}
      </AppBar>
    );
  }
  
  export default Footer;