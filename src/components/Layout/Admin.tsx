import { Box, makeStyles } from '@material-ui/core';
import { Header, SideBar } from 'components/Common';
import { DashBoardFeature } from 'features/dashboard';
import ProductFeature from 'features/product';
import { Route, Switch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '300px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,
    minHeight: '100vh',
  },
  header: {
    gridArea: 'header',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  main: {
    gridArea: 'main',
    padding: theme.spacing(2, 3),
  },
}));

export function AdminLayout() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>
      <Box className={classes.sidebar}>
        <SideBar />
      </Box>
      <Box className={classes.main}>
        <Switch>
          <Route path="/admin/dashboard">
            <DashBoardFeature />
          </Route>
          <Route path="/admin/products">
            <ProductFeature />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}
