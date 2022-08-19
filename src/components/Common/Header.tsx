import { makeStyles } from '@material-ui/core';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },
}));
export function Header() {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    dispatch(authActions.logout());
  };
  return (
    <div className={classes.root}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              DashhBoard
            </Typography>
            <Button color="inherit" onClick={handleLogoutClick}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
