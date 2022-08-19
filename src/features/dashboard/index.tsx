import { Box, Grid, LinearProgress, makeStyles } from '@material-ui/core';
import { PeopleAlt } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import StatisticItem from './components/StatisticItem';
import CommentIcon from '@mui/icons-material/Comment';
import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestProductList,
  selectLowestProductList,
} from './dashboardSlice';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(2),
  },

  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
  statistics: {
    margin: theme.spacing(1),
  },
}));
export function DashBoardFeature() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestProductList = useAppSelector(selectHighestProductList);
  const lowestProductList = useAppSelector(selectLowestProductList);
  console.log({
    loading,
    statistics,
    // highestProductList,
    // lowestProductList,
  });
  const classes = useStyles();
  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);
  return (
    <Box className={classes.root}>
      {/*Statistic Section*/}
      {loading && <LinearProgress className={classes.loading} />}
      <Grid container>
        <Grid item xs={12} md={6} lg={4} xl={3} className={classes.statistics}>
          <StatisticItem
            icon={<CommentIcon fontSize="large" color="primary" />}
            label="Áo Thun"
            value={statistics.aoThunCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3} className={classes.statistics}>
          <StatisticItem
            icon={<CommentIcon fontSize="large" color="primary" />}
            label="Áo Polo"
            value={statistics.aoPoloCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3} className={classes.statistics}>
          <StatisticItem
            icon={<CommentIcon fontSize="large" color="primary" />}
            label="Áo Khoác"
            value={statistics.aoKhoacCount}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
