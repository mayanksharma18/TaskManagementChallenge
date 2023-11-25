import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Board from './Board/Board';

const Home = () => {
  return (
    <div>
    
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Task Management App
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Board />
        </Toolbar>
    </div>
  );
};

export default Home;
