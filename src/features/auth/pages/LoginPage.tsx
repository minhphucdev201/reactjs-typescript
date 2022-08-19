import { Box, Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions } from '../authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row no-wrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  box: {
    padding: theme.spacing(4),
  },
}));
export default function LoginPage() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isLogging = useAppSelector((state) => state.auth.logging);
  const handleLoginClick = () => {
    dispatch(
      authActions.login({
        username: '',
        password: '',
      })
    );
  };
  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box}>
        <Typography variant="h4" component="h1">
          Login
        </Typography>
        <Box mt={4}>
          <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
            {isLogging && <CircularProgress size={20} color="secondary" />} &nbsp; Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
