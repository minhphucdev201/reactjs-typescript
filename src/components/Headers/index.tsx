import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <></>
    // <Box sx={{ flexGrow: 1 }}>
    //   <AppBar position="static">
    //     <Toolbar>
    //       <IconButton
    //         size="large"
    //         edge="start"
    //         color="inherit"
    //         aria-label="menu"
    //         sx={{ mr: 2 }}
    //       >
    //         <MenuIcon />
    //       </IconButton>
    //       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    //         News
    //       </Typography>
    //       <NavLink to="/products">
    //         <Button variant="outlined" color="inherit">
    //           Sản Phẩm
    //         </Button>
    //       </NavLink>
    //       <NavLink to="/admin">
    //         <Button variant="outlined" color="inherit">
    //           Admin
    //         </Button>
    //       </NavLink>
    //       <Button color="inherit">Login</Button>
    //     </Toolbar>
    //   </AppBar>
    // </Box>
  );
}
